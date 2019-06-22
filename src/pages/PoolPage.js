import React, { useState } from "react"

import {
  View,
  Panel,
  PanelHeader,
  FormLayout,
  FormStatus,
  Progress,
} from "@vkontakte/vkui"
import { validateAnswer } from "../utils/validators"
import ErrorPage from "../pages/ErrorPage"
import Question from "../components/questions/Question"
import ThanksPanel from "../components/ThanksPanel"
import QuestionControls from "../components/QuestionControls/"

// Temporary
// Remove when will occurs merge with master
// Also change name of the file
import mockPoolList from "../mockSurveyList"

const PoolPage = ({ location }) => {
  const poolId = location.pathname.slice(1)
  const poolData = mockPoolList.filter((pool) => pool.id === poolId)[0]

  if (!poolData) {
    return <ErrorPage />
  }

  const [activePanel, setActivePanel] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [seenQuestions, setSeenQuestions] = useState([])

  const totalQuestionsNumber = poolData.questions.length - 1

  return (
    <div>
      <View activePanel={activePanel}>
        {[
          ...poolData.questions.map((question, index) => {
            const error =
              question.isRequired &&
              validateAnswer(question.type, userAnswers[question.id])

            const hasError = error && seenQuestions.indexOf(question.id) !== -1

            return (
              <Panel id={index}>
                <PanelHeader>{poolData.title}</PanelHeader>
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
                      [question.id]: value,
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
                    setActivePanel("confirmation")
                  }}
                  isNextButtonDisabled={hasError}
                  isFirstQuestion={activePanel === 0}
                  isLastQuestion={activePanel === totalQuestionsNumber}
                />
              </Panel>
            )
          }),
          // Extract into separate component
          <Panel id="confirmation">
            <ThanksPanel confirmationMessage={poolData.confirmationMessage} />
          </Panel>,
        ]}
      </View>
    </div>
  )
}

export default PoolPage
