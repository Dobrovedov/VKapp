import React from "react"
import PropTypes from "prop-types"

import { Select, Cell } from "@vkontakte/vkui"

const DropdownQuestion = ({
  id,
  title,
  description,
  placeholder,
  options,
  value,
  onChange,
}) => {
  console.log(value.selectedAnswer)
  return (
    <>
      <Cell>{title}</Cell>
      <Cell>{description}</Cell>
      <Select
        id={id}
        placeholder={placeholder}
        onChange={(event) => {
          onChange({
            selectedAnswer: event.target.value,
          })
        }}
        value={value.selectedAnswer}
      >
        {options.map((text, index) => {
          return <option value={text}>{text}</option>
        })}
      </Select>
    </>
  )
}

DropdownQuestion.defaultProps = {
  value: {
    selectedAnswer: "",
  },
}

DropdownQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
}

export default DropdownQuestion
