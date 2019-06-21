import React, { useState, useEffect } from "react"

import { View, Panel, PanelHeader, Div, Progress } from "@vkontakte/vkui"
import ErrorPage from "../pages/ErrorPage"
import NextButton from "../components/NextButton"
import SubmitButton from "../components/SubmitButton"
import BackButton from "../components/BackButton"
import Question from "../components/questions/Question"
import ThanksPanel from "../components/ThanksPanel"

import axios from "axios"

const PoolPage = () => {
  const poolId = window.location.hash.slice(1)
  const [poolData, setPoolData] = useState({})
  const [activePanel, setActivePanel] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://foodtechmoneymaker.herokuapp.com/surveys/${poolId}`, {
        mode: "no-cors",
      })
      .then((res) => {
        setPoolData(res.data)
        setIsLoading(false)
      })
  }, [poolId])

  // Make loading Page or Spinner
  if (isLoading) {
    return "Loading..."
  }

  if (!poolData) {
    return <ErrorPage />
  }

  const totalQuestionsNumber = poolData.questions.length - 1

  return (
    <div>
      <View activePanel={activePanel}>
        {[
          ...poolData.questions.map((question, index) => (
            <Panel id={index}>
              <PanelHeader>{poolData.title}</PanelHeader>
              <div>
                <Progress value={(activePanel / totalQuestionsNumber) * 100} />
              </div>
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
              <Div style={{ display: "flex" }}>
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
              </Div>
            </Panel>
          )),
          // Extract into separate component
          <Panel id="confirmation">
            <ThanksPanel
              confirmationMessage={poolData.meta.confirmationMessage}
            />
          </Panel>,
        ]}
      </View>
    </div>
  )
}

export default PoolPage
