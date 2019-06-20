import React, { useState, useReducer } from "react"

import { View, Panel, PanelHeader, Div } from "@vkontakte/vkui"
import ErrorPage from "../pages/ErrorPage"
import NextButton from "../components/NextButton"
import SubmitButton from "../components/SubmitButton"
import BackButton from "../components/BackButton"
import Question from "../components/questions/Question"

const PoolPage = ({ location }) => {
  const poolId = location.pathname.slice(1)
  const poolData = getSurvey(poolId)

  const [activePanel, setActivePanel] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  if (!poolData) {
    return <ErrorPage />
  }

  const totalQuestionsNumber = poolData.questions.length - 1

  return (
    <View activePanel={activePanel}>
      {[
        ...poolData.questions.map((question, index) => (
          <Panel id={index}>
            <PanelHeader>{poolData.title}</PanelHeader>

            <Question
              question={question}
              onChange={(value) => {
                setUserAnswers({
                  ...userAnswers,
                  [question.id]: value,
                })
              }}
            />

            {activePanel > 0 && (
              <BackButton onClick={() => setActivePanel(activePanel - 1)} />
            )}
            {activePanel < totalQuestionsNumber ? (
              <NextButton onClick={() => setActivePanel(activePanel + 1)} />
            ) : (
              <SubmitButton
                onClick={() => {
                  setActivePanel("confirmation")
                  console.log(userAnswers)
                }}
              />
            )}
          </Panel>
        )),
        // Extract into separate component
        <Panel id="confirmation">
          <Div
            style={{
              paddingTop: 30,
              paddingBottom: 60,
              color: "gray",
              textAlign: "center",
            }}
          >
            <h2>Опрос завершен</h2>
            <br />
            <p>{poolData.confirmationMessage}</p>
          </Div>
        </Panel>,
      ]}
    </View>
  )
}

export default PoolPage
