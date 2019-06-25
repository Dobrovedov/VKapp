import React, { useState, useEffect } from "react"

import {
  View,
  Panel,
  PanelHeader,
  FormLayout,
  FormStatus,
  Progress,
  Spinner,
  HeaderButton,
} from "@vkontakte/vkui"
import Icon24Globe from "@vkontakte/icons/dist/24/globe"
import { validateAnswer } from "../utils/validators"

import ErrorPage from "../pages/ErrorPage"
import Question from "../components/questions/Question"
import ThanksPanel from "../components/ThanksPanel"
import WelcomePanel from "../components/WelcomePanel"
import QuestionControls from "../components/QuestionControls/"
import LanguagePanel from "../components/LanguagePanel"

import usePrevious from "../hooks/usePrevious"
import useTranslate from "../hooks/useTranslate"

import { translateSurveyMeta } from "../translator.js"
import { getSurvey, sendAnswers, sendChangedAnswers } from "../api"
import prepareResponse from "../utils/prepareResponse"
import prepareUser from "../utils/prepareUser"

import realConnect from "@vkontakte/vkui-connect"
import mockConnect from "@vkontakte/vkui-connect-mock"

// Mocking connect
let connect = process.env.NODE_ENV === "production" ? realConnect : mockConnect

const SurveyPage = () => {
  const poolId = window.location.hash.slice(1)
  const [poolData, setPoolData] = useState({})

  const [activePanel, setActivePanel] = useState("Welcome")
  const [prevPanel, setPrevPanel] = useState("Welcome")

  const [userAnswers, setUserAnswers] = useState({})
  const [seenQuestions, setSeenQuestions] = useState([])
  const [responseId, setResponseId] = useState(null)

  const [language, setLanguage] = useState(navigator.language.slice(0, 2))
  const [translated, setTranslated] = useState()

  const [isLoading, setIsLoading] = useState(true)

  const prevUserAnswer = usePrevious(userAnswers)

  const [user, setUser] = useState()

  // User Retrieval
  useEffect(() => {
    connect.subscribe((e) => {
      if (e.detail.type === "VKWebAppGetUserInfoResult") {
        setUser(e.detail.data)
      }
    })
  }, [user])

  // Data Retrieval
  useEffect(() => {
    getSurvey(poolId).then((res) => {
      setPoolData(res.data)
      setIsLoading(false)
      translateSurveyMeta(res.data, language).then((translation) =>
        setTranslated(translation),
      )
    })
  }, [poolId, language])

  // Control Translation
  const nextButtonTranslation = useTranslate("Далее", language)
  const backButtonTranslation = useTranslate("Назад", language)
  const submitButtonTranslation = useTranslate("Завершить", language)

  const sendRequestByNext = (question) => {
    // Skip if no changes happened
    if (prevUserAnswer[question.id] === userAnswers[question.id]) {
      return
    }

    // Generate new response
    // If no was provided before
    if (!responseId) {
      sendAnswers(
        poolId,
        prepareResponse(poolId, userAnswers),
        prepareUser(user),
      ).then((response) => {
        setResponseId(response.data.id)
      })
      return
    }

    // Update response with new values
    sendChangedAnswers(
      poolId,
      responseId,
      prepareResponse(poolData.id, userAnswers),
    )
  }

  const sendRequestByBack = (question) => {
    // Skip if no changes happened
    if (prevUserAnswer[question.id] === userAnswers[question.id]) {
      return
    }

    if (!responseId) {
      return
    }

    // Update response with new values
    sendChangedAnswers(
      poolId,
      responseId,
      prepareResponse(poolData.id, userAnswers),
    )
  }

  // Make loading Page or Spinner
  if (isLoading) {
    return (
      <View activePanel="spinner">
        <Panel id="spinner">
          <Spinner size="large" style={{ marginTop: "50%" }} />
        </Panel>
      </View>
    )
  }

  if (!poolData || !poolId) {
    return <ErrorPage language={language} />
  }

  const totalQuestionsNumber = poolData.questions.length - 1

  return (
    <div>
      <View activePanel={activePanel}>
        {[
          <Panel id="Welcome">
            <WelcomePanel
              language={language}
              onClick={() => {
                connect.send("VKWebAppGetUserInfo")
                setActivePanel(0)
              }}
              title={translated && translated.title}
              description={translated && translated.description}
              company={poolData.meta.company.companyName}
            />
          </Panel>,
          ...poolData.questions.map((question, index) => {
            const error =
              question.required &&
              validateAnswer(question.type, userAnswers[question.id])

            const hasError = error && seenQuestions.indexOf(question.id) !== -1

            return (
              <Panel id={index}>
                <PanelHeader
                  left={
                    <HeaderButton
                      onClick={() => {
                        setPrevPanel(activePanel)
                        setActivePanel("languages")
                      }}
                    >
                      <Icon24Globe />
                    </HeaderButton>
                  }
                >
                  {translated && translated.title}
                </PanelHeader>
                <Progress value={(activePanel / totalQuestionsNumber) * 100} />
                {hasError && (
                  <FormLayout>
                    <FormStatus state={"error"}>{error}</FormStatus>
                  </FormLayout>
                )}
                <Question
                  question={question}
                  value={userAnswers[question.id]}
                  onChange={(value) => {
                    setUserAnswers({
                      ...userAnswers,
                      [question.id]: { type: question.type, ...value },
                    })
                  }}
                  language={language}
                />
                <QuestionControls
                  onBack={() => {
                    sendRequestByBack(question)
                    setActivePanel(activePanel - 1)
                  }}
                  onNext={() => {
                    setSeenQuestions([...seenQuestions, question.id])
                    sendRequestByNext(question)
                    setActivePanel(activePanel + 1)
                  }}
                  onSubmit={() => {
                    sendRequestByNext(question)
                    setActivePanel("confirmation")
                  }}
                  isNextButtonDisabled={!!error}
                  isFirstQuestion={activePanel === 0}
                  isLastQuestion={activePanel === totalQuestionsNumber}
                  translation={{
                    nextButton: nextButtonTranslation,
                    backButton: backButtonTranslation,
                    submitButton: submitButtonTranslation,
                  }}
                />
              </Panel>
            )
          }),
          // Extract into separate component
          <Panel id="confirmation">
            <ThanksPanel
              confirmationMessage="Спасибо за уделённое нам время!"
              language={language}
            />
          </Panel>,
          <Panel id="languages">
            <PanelHeader>Выбор страны</PanelHeader>
            <LanguagePanel
              language={language}
              setAnotherLanguage={(lang) => {
                setLanguage(lang)
                setActivePanel(prevPanel)
              }}
            />
          </Panel>,
        ]}
      </View>
    </div>
  )
}

export default SurveyPage
