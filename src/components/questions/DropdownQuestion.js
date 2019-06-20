import React from "react"
import PropTypes from "prop-types"

import { Select, Cell } from "@vkontakte/vkui"

const DropdownQuestion = ({
  id,
  title,
  description,
  placeholder,
  options,
  onChange,
}) => {
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
      >
        {options.map((value) => {
          return <option value={value}>{value}</option>
        })}
      </Select>
    </>
  )
}

DropdownQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  mandatory: PropTypes.bool,
  onChange: PropTypes.func,
}

export default DropdownQuestion
