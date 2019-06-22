import React, { useState, useEffect } from "react"

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
import QuestionControls from "../components/QuestionControls/"

import { getSurvey, sendAnswers } from "../api"
import prepareResponse from "../prepareResponse"

const SurveyPage = ({ user }) => {
  const poolId = window.location.hash.slice(1)
  const [poolData, setPoolData] = useState({})
  const [activePanel, setActivePanel] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [seenQuestions, setSeenQuestions] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  console.log(user)

  // Data Retrieval
  useEffect(() => {
    getSurvey(poolId).then((res) => {
      setPoolData(res.data)
      setIsLoading(false)
    })
  }, [poolId])

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
                    setActivePanel(activePanel - 1)
                  }}
                  onNext={() => {
                    setSeenQuestions([...seenQuestions, question.id])
                    setActivePanel(activePanel + 1)
                  }}
                  onSubmit={() => {
                    sendAnswers(
                      poolData.id,
                      prepareResponse(poolData.id, userAnswers),
                    )
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
