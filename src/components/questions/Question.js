import React from "react"
import PropTypes from "prop-types"

import { FormLayout } from "@vkontakte/vkui"

import RadioQuestion from "./RadioQuestion"
import DropdownQuestion from "./DropdownQuestion"
import TextareaQuestion from "./TextareaQuestion"
import CheckboxQuestion from "./CheckboxQuestion"

const Question = ({ question, onChange, status }) => {
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
    return (
      <FormLayout>
        <CheckboxQuestion
          id={question.id}
          title={question.title}
          description={question.helpText}
          options={question.options}
          mandatory={question.isRequired}
          hasAnotherOption={question.hasOtherOption}
          onChange={onChange}
        />
      </FormLayout>
    )
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
  status: PropTypes.oneOf(["valid", "error"]),
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
