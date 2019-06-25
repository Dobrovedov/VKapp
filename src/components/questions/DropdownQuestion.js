import React from "react"
import PropTypes from "prop-types"

import { Select, Cell, Spinner } from "@vkontakte/vkui"

import useTranslation from "../../hooks/useTranslation"

const DropdownQuestion = ({
  id,
  title,
  description,
  placeholder,
  options,
  value,
  onChange,
  language,
}) => {
  const { translated, isLoading } = useTranslation(
    { title, description, options },
    language,
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Cell description={translated.description || description} multiline>
        {translated.title || title}
      </Cell>
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
          return (
            <option value={text}>
              {(translated.options && translated.options[index]) || text}
            </option>
          )
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
