import React from "react"
import PropTypes from "prop-types"

import { Radio, Div } from "@vkontakte/vkui"

const RadioQuestion = ({
  id,
  title,
  description,
  placeholder,
  mandatory,
  options,
  onChange,
  hasAnotherOption,
}) => {
  return (
    <div>
      <Div>{title}</Div>
      {options.map((option) => (
        <Radio
          name={id}
          description={option}
          onChange={(event) => {
            onChange({ selectedAnotherOption: false, selectedAnswer: option })
          }}
        />
      ))}
      {hasAnotherOption && (
        <Radio
          name={id}
          description={"Иное"}
          onChange={(event) => {
            onChange({ selectedAnotherOption: true, selectedAnswer: "Another" })
          }}
        />
      )}
    </div>
  )
}

RadioQuestion.defaultProps = {
  mandatory: false,
  hasAnotherOption: false,
}

RadioQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  mandatory: PropTypes.bool.isRequired,
  hasAnotherOption: PropTypes.bool,
}

export default RadioQuestion
