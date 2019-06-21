import React, { useState, useEffect } from "react"

import {
  View,
  Panel,
  PanelHeader,
  Div,
  FormLayout,
  FormStatus,
  Progress,
} from "@vkontakte/vkui"
import ErrorPage from "../pages/ErrorPage"
import NextButton from "../components/NextButton"
import SubmitButton from "../components/SubmitButton"
import BackButton from "../components/BackButton"
import Question from "../components/questions/Question"
import ThanksPanel from "../components/ThanksPanel"

const mockPoolList = [
  {
    id: "12XJWWr-Z8gkRdxrkwoU8CYg1h8GqWv3OJh-AOLzpyyQ",

    title: "Заголовок опроса",
    description: "Описание опроса",
    companyId: "",
    editorEmails: ["stevenschmatz@gmail.com"],
    confirmationMessage: "Thanks for submitting your contact info!",

    questions: [
      {
        type: "TEXTAREA",
        helpText: "Little description",
        placeholder: "",
        title: "Name",
        id: 1633920210,
        isRequired: false,
      },
      {
        type: "MULTIPLE_CHOICE",
        helpText: "",
        id: 1770822543,
        title: "How much do you like choices?",
        isRequired: false,
        hasOtherOption: true,
        placeholder: "",
        options: ["I choose you!", "No, you!", "Never mind, you!"],
      },
      {
        type: "CHECKBOX",
        helpText: "Description",
        id: 1846923513,
        title: "How much do you like checkboxes?",
        isRequired: false,
        hasOtherOption: true,
        placeholder: "",
        options: ["Gorgeous", "Majestic", "Palatial", "Fancy"],
      },
      {
        type: "DROPDOWN",
        helpText: "",
        id: 449887830,
        title: "How much do you like dropdowns?",
        isRequired: false,
        placeholder: "",
        options: ["I love it <3", "So-so", "Nah, dispose of them"],
      },
    ],
  },
]

const PoolPage = ({ location }) => {
  const poolId = location.pathname.slice(1)
  const poolData = mockPoolList.filter((pool) => pool.id === poolId)[0]

  if (!poolData) {
    return <ErrorPage />
  }

  const [activePanel, setActivePanel] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [questionsStatus, setQuestionsStatus] = useState(
    poolData.questions.map(() => "valid"),
  )

  const handleError = useEffect(
    (question, next) => {
      const status = questionsStatus
      const answer = userAnswers[question.id]

      if (
        answer !== undefined &&
        ((answer.text !== undefined && answer.text.length > 0) ||
          (answer.selectedAnswer !== undefined &&
            answer.selectedAnswer.length > 0) ||
          (answer.selectedAnswers !== undefined &&
            answer.selectedAnswers.length > 0))
      ) {
        status[activePanel] = "valid"
      } else if (next !== undefined) {
        status[activePanel] = "error"
      }

      setQuestionsStatus(status)
      if (questionsStatus[activePanel] === "valid" && next !== undefined) {
        setActivePanel(next)
      }
    },
    [questionsStatus, userAnswers],
  )

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
              {questionsStatus[index] === "error" ? (
                <FormLayout>
                  <FormStatus
                    title="Неккоректые данные"
                    state={questionsStatus[index]}
                  >
                    {(() => {
                      switch (question.type) {
                        case "TEXTAREA":
                        case "DROPDOWN":
                          return "Поле не должно оставаться пустым"
                        case "CHECKBOX":
                        case "MULTIPLE_CHOICE":
                          return "Не выбран ни один вариант"
                      }
                    })()}
                  </FormStatus>
                </FormLayout>
              ) : null}
              <Question
                question={question}
                value={userAnswers[question.id]}
                onChange={(value) => {
                  setUserAnswers({
                    ...userAnswers,
                    [question.id]: value,
                  })
                  handleError(question)
                }}
              />
              <Div style={{ display: "flex" }}>
                {activePanel > 0 && (
                  <BackButton
                    onClick={() => {
                      handleError(question, activePanel - 1)
                      //setActivePanel(activePanel - 1)
                    }}
                  />
                )}
                {activePanel < totalQuestionsNumber ? (
                  <NextButton
                    onClick={() => {
                      handleError(question, activePanel + 1)
                      //setActivePanel(activePanel + 1)
                    }}
                  />
                ) : (
                  <SubmitButton
                    onClick={() => {
                      if (questionsStatus.some((item) => item === "error")) {
                        return
                      }
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
            <ThanksPanel confirmationMessage={poolData.confirmationMessage} />
          </Panel>,
        ]}
      </View>
    </div>
  )
}

export default PoolPage
