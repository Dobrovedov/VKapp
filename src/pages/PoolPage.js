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

const validateAnswers = (answers, questions) => {
  // Выполняешь проверку в зависимости от типа данных
  // Можешь запросить дополнительные данные для функции из рендера
  // Все объекты не прошедшие проверку
  // Возвращаешь в формет
  // {
  //   832634124914: "Какое-то значение"
  // }
  // Данный способ работает при каждом рендере компонента
  // По возможности старайся не мутировать состояния
  // В ином случае скорее всего возникнут ошибки
  // Пример ошибки на 3 объекте я превел

  const status = {}

  const getMessage = (question, answer) => {
    switch (question.type) {
      case "TEXTAREA":
        if (!answer || answer.text.search(/\S/) === -1) {
          return "Поле не должно оставаться пустым"
        }
        break
      case "DROPDOWN":
        if (!answer || !answer.selectedAnswer) {
          return "Поле не должно оставаться пустым"
        }
        break
      case "CHECKBOX":
        if (!answer || answer.selectedAnswers.length === 0) {
          return "Не выбран ни один вариант"
        }
        break
      case "MULTIPLE_CHOICE":
        if (!answer || !answer.selectedAnswer === 0) {
          return "Не выбран ни один вариант"
        }
        break
    }
    return null
  }

  questions.forEach((question) => {
    const answer = answers[question.id]
    status[question.id] = getMessage(question, answer)
  })

  return status
}

const PoolPage = ({ location }) => {
  const poolId = location.pathname.slice(1)
  const poolData = mockPoolList.filter((pool) => pool.id === poolId)[0]

  if (!poolData) {
    return <ErrorPage />
  }

  const [activePanel, setActivePanel] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})

  const errors = validateAnswers(userAnswers, poolData.questions)

  console.log(errors)

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
              {errors[question.id] && (
                <FormLayout>
                  <FormStatus title="Неккоректые данные" state="error">
                    {errors[question.id]}
                  </FormStatus>
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
              <Div style={{ display: "flex" }}>
                {activePanel > 0 && (
                  <BackButton
                    onClick={() => {
                      setActivePanel(activePanel - 1)
                    }}
                  />
                )}
                {activePanel < totalQuestionsNumber ? (
                  <NextButton
                    onClick={() => {
                      setActivePanel(activePanel + 1)
                    }}
                  />
                ) : (
                  <SubmitButton
                    onClick={() => {
                      let existError = false
                      for (let id in Object.keys(errors)) {
                        if (errors[id]) {
                          existError = true
                          break
                        }
                      }

                      if (Object.keys(errors).length === 0 || !existError) {
                        setActivePanel("confirmation")
                      }
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
