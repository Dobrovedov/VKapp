import React, { useState, useEffect, useRef } from "react"

import {
  View,
  Panel,
  PanelHeader,
  FormLayout,
  FormStatus,
  Progress,
  Spinner,
} from "@vkontakte/vkui"
import { validateAnswer } from "../utils/validators"

import ErrorPage from "../pages/ErrorPage"
import Question from "../components/questions/Question"
import ThanksPanel from "../components/ThanksPanel"
import WelcomePanel from "../components/WelcomePanel"
import QuestionControls from "../components/QuestionControls/"

import usePrevious from "../hooks/usePrevious"
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
  const [userAnswers, setUserAnswers] = useState({})
  const [seenQuestions, setSeenQuestions] = useState([])
  const [responseId, setResponseId] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const prevUserAnswer = usePrevious(userAnswers)

  const [user, setUser] = useState()

  // User Retrieval
  useEffect(() => {
    connect.subscribe((e) => {
      console.log(e)
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
    })
  }, [poolId])

  const sendRequestByNext = (question) => {
    // Skip if no changes happened
    if (prevUserAnswer[question.id] === userAnswers[question.id]) {
      return
    }

    // Generate new response
    // If no was provided before
    if (!responseId) {
      sendAnswers(poolId, prepareResponse(poolId, userAnswers)).then(
        (response) => {
          setResponseId(response.data.id)
        },
      )
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
    return <ErrorPage />
  }

  const totalQuestionsNumber = poolData.questions.length - 1

  return (
    <div>
      <View activePanel={activePanel}>
        {[
          <Panel id="Welcome">
            <WelcomePanel
              onClick={() => {
                connect.send("VKWebAppGetUserInfo")
                setActivePanel(0)
              }}
              title={poolData.meta.title}
              description={poolData.meta.description}
              company={poolData.meta.companyName}
            />
          </Panel>,
          ...poolData.questions.map((question, index) => {
            const error =
              question.required &&
              validateAnswer(question.type, userAnswers[question.id])

            const hasError = error && seenQuestions.indexOf(question.id) !== -1

            return (
              <Panel id={index}>
                <PanelHeader>{poolData.meta.title}</PanelHeader>
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
                    sendAnswers(
                      poolData.id,
                      prepareResponse(poolData.id, userAnswers),
                      prepareUser(user),
                    )
                    sendRequestByNext(question)
                    setActivePanel("confirmation")
                  }}
                  isNextButtonDisabled={!!error}
                  isFirstQuestion={activePanel === 0}
                  isLastQuestion={activePanel === totalQuestionsNumber}
                />
              </Panel>
            )
          }),
          // Extract into separate component
          <Panel id="confirmation">
            <ThanksPanel confirmationMessage="Спасибо за уделённое нам время!" />
          </Panel>,
        ]}
      </View>
    </div>
  )
}

export default SurveyPage
