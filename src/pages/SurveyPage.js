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

import ErrorPage from "./ErrorPage"
import Question from "../components/questions/Question"
import ThanksPanel from "../components/ThanksPanel"
import WelcomePanel from "../components/WelcomePanel"
import QuestionControls from "../components/QuestionControls"

import usePrevious from "../hooks/usePrevious"

import { getSurvey, sendAnswers, sendChangedAnswers } from "../api"
import prepareResponse from "../prepareResponse"

const PoolPage = () => {
  const surveyId = window.location.hash.slice(1)
  const [surveyData, setSurveyData] = useState({})
  const [activePanel, setActivePanel] = useState("Welcome")
  const [userAnswers, setUserAnswers] = useState({})
  const [seenQuestions, setSeenQuestions] = useState([])
  const [responseId, setResponseId] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const prevUserAnswer = usePrevious(userAnswers)

  // Data Retrieval
  useEffect(() => {
    getSurvey(surveyId).then((res) => {
      setSurveyData(res.data)
      setIsLoading(false)
    })
  }, [surveyId])

  const sendRequestByNext = (question) => {
    // Skip if no changes happened
    if (prevUserAnswer[question.id] === userAnswers[question.id]) {
      return
    }

    // Generate new response
    // If no was provided before
    if (!responseId) {
      sendAnswers(surveyId, prepareResponse(surveyId, userAnswers)).then(
        (response) => {
          setResponseId(response.data.id)
        },
      )
      return
    }

    // Update response with new values
    sendChangedAnswers(
      surveyId,
      responseId,
      prepareResponse(surveyData.id, userAnswers),
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
      surveyId,
      responseId,
      prepareResponse(surveyData.id, userAnswers),
    )
  }

  if (isLoading) {
    return (
      <View activePanel="spinner">
        <Panel id="spinner">
          <Spinner size="large" style={{ marginTop: "50%" }} />
        </Panel>
      </View>
    )
  }

  if (!surveyData || !surveyId) {
    return <ErrorPage />
  }

  const totalQuestionsNumber = surveyData.questions.length - 1

  return (
    <div>
      <View activePanel={activePanel}>
        {[
          <Panel id="Welcome" style={{ padding: 0 }}>
            <WelcomePanel
              onClick={() => {
                setActivePanel(0)
              }}
              title={surveyData.meta.title}
              description={surveyData.meta.description}
            />
          </Panel>,
          ...surveyData.questions.map((question, index) => {
            const error =
              question.required &&
              validateAnswer(question.type, userAnswers[question.id])

            const hasError = error && seenQuestions.indexOf(question.id) !== -1

            return (
              <Panel id={index}>
                <PanelHeader>{surveyData.meta.title}</PanelHeader>
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
          <Panel id="confirmation">
            <ThanksPanel confirmationMessage="Спасибо за уделённое нам время!" />
          </Panel>,
        ]}
      </View>
    </div>
  )
}

export default PoolPage
