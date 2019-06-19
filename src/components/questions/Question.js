import React from "react"
import PropTypes from "prop-types"

import RadioQuestion from "./RadioQuestion"

const Question = ({ question, onChange }) => {
  if (question.type === "TEXTAREA") {
    return <div />
  }

  if (question.type === "MULTIPLE_CHOICE") {
    return <RadioQuestion {...question} onChange={onChange} />
  }

  if (question.type === "CHECKBOX") {
    return <div />
  }

  if (question.type === "DROPDOWN") {
    return <div />
  }

  return <div>Неверный тип вопроса</div>
}

Question.propTypes = {
  onChange: PropTypes.func,
  question: PropTypes.shape({
    type: PropTypes.oneOf([
      "TEXTAREA",
      "MULTIPLE_CHOICE",
      "CHECKBOX",
      "DROPDOWN",
    ]),
  }),
}

export default Question
