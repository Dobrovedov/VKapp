import React from "react"
import PropTypes from "prop-types"

import { Radio, Cell } from "@vkontakte/vkui"

const RadioQuestion = ({
  id,
  title,
  options,
  value,
  onChange,
  hasAnotherOption,
}) => {
  return (
    <>
      <Cell>{title}</Cell>
      {options.map((option) => (
        <Radio
          name={id}
          description={option}
          checked={value.selectedAnswer === option}
          onChange={(event) => {
            onChange({ selectedAnotherOption: false, selectedAnswer: option })
          }}
        />
      ))}
      {hasAnotherOption && (
        <Radio
          name={id}
          description={"Другое"}
          checked={value.selectedAnswer === "Другое"}
          onChange={(event) => {
            onChange({ selectedAnotherOption: true, selectedAnswer: "Другое" })
          }}
        />
      )}
    </>
  )
}

RadioQuestion.defaultProps = {
  value: {
    selectedAnotherOption: false,
    selectedAnswer: "",
  },
  hasAnotherOption: false,
}

RadioQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  hasAnotherOption: PropTypes.bool,
}

export default RadioQuestion
