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

const validateTextarea = (value) => {
  if (!value.text) {
    return "Заполните поле"
  }
}

const validateBox = (value) => {
  console.log(value)
  if (value.selectedAnswers && value.selectedAnswers.length === 0) {
    return "Выберите хотя бы одно поле"
  }
}

const validateAnswer = (question, value) => {
  let validationResult

  switch (question.type) {
    case "TEXTAREA":
      validationResult = validateTextarea(value)
      break
    case "MULTIPLE_CHOICE":
    case "CHECKBOX":
    case "DROPDOWN":
      validationResult = validateBox(value)
      break
    default:
      break
  }

  return { [question.id]: validationResult }
}

const PoolPage = ({ location }) => {
  const poolId = location.pathname.slice(1)
  const poolData = mockPoolList.filter((pool) => pool.id === poolId)[0]

  if (!poolData) {
    return <ErrorPage />
  }

  const [activePanel, setActivePanel] = useState(0)
  const [store, setStore] = useState({ errors: {}, answers: {} })
  const [seenQuestions, setSeenQuestions] = useState([])

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
              <div>
                {store.errors[question.id] &&
                  seenQuestions.indexOf(question.id) !== -1 && (
                    <FormLayout>
                      <FormStatus state={"error"}>
                        {store.errors[question.id]}
                      </FormStatus>
                    </FormLayout>
                  )}
              </div>
              <Question
                question={question}
                value={store.answers[question.id]}
                onChange={(value) => {
                  setStore({
                    errors: {
                      ...store.errors,
                      ...validateAnswer(question, value),
                    },
                    answers: {
                      ...store.answers,
                      [question.id]: value,
                    },
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
                      setSeenQuestions([...seenQuestions, question.id]) // remove duplicate ids
                      setActivePanel(activePanel + 1)
                    }}
                  />
                ) : (
                  <SubmitButton
                    onClick={() => {
                      setActivePanel("confirmation")
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
