import React from "react"
import PropTypes from "prop-types"

import { FormLayout } from "@vkontakte/vkui"

import RadioQuestion from "./RadioQuestion"
import DropdownQuestion from "./DropdownQuestion"
import TextareaQuestion from "./TextareaQuestion"
import CheckboxQuestion from "./CheckboxQuestion"

const Question = ({ question, onChange }) => {
  const props = {
    id: question.id,
    title: question.title,
    description: question.helpText,
    placeholder: question.placeholder,
    mandatory: question.isRequired,
    onChange,
  }

  const questionElements = {
    TEXTAREA: <TextareaQuestion {...props} />,
    MULTIPLE_CHOICE: (
      <RadioQuestion
        {...props}
        options={question.options}
        hasAnotherOption={question.hasOtherOption}
      />
    ),
    CHECKBOX: (
      <CheckboxQuestion
        {...props}
        options={question.options}
        hasAnotherOption={question.hasOtherOption}
      />
    ),
    DROPDOWN: <DropdownQuestion {...props} options={question.options} />,
  }

  return questionElements[question.type] ? (
    <FormLayout>{questionElements[question.type]}</FormLayout>
  ) : (
    <div>Неверный тип вопроса</div>
  )
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
