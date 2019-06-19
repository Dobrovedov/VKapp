import React from "react"
import PropTypes from "prop-types"

import { FormLayout } from "@vkontakte/vkui"

import RadioQuestion from "./RadioQuestion"
import DropdownQuestion from "./DropdownQuestion"
import TextareaQuestion from "./TextareaQuestion"

const Question = ({ question, onChange }) => {
  if (question.type === "TEXTAREA") {
    return (
      <FormLayout>
        <TextareaQuestion
          id={question.id}
          title={question.title}
          description={question.helpText}
          placeholder={question.placeholder}
          mandatory={question.isRequired}
          onChange={onChange}
        />
      </FormLayout>
    )
  }

  if (question.type === "MULTIPLE_CHOICE") {
    return (
      <FormLayout>
        <RadioQuestion
          id={question.id}
          title={question.title}
          description={question.helpText}
          placeholder={question.placeholder}
          mandatory={question.isRequired}
          options={question.options}
          hasAnotherOption={question.hasOtherOption}
          onChange={onChange}
        />
      </FormLayout>
    )
  }

  if (question.type === "CHECKBOX") {
    return <div></div>
  }

  if (question.type === "DROPDOWN") {
    return (
      <FormLayout>
        <DropdownQuestion
          id={question.id}
          title={question.title}
          description={question.helpText}
          mandatory={question.isRequired}
          options={question.options}
          onChange={onChange}
        />
      </FormLayout>
    )
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
