import React from "react"
import PropTypes from "prop-types"

import { Radio, Cell, Spinner } from "@vkontakte/vkui"

import useTranslation from "../../hooks/useTranslation"

const RadioQuestion = ({
  id,
  title,
  description,
  options,
  value,
  onChange,
  hasAnotherOption,
  language,
}) => {
  const { translated, isLoading } = useTranslation(
    {
      title,
      description,
      options,
    },
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
      {options.map((option, index) => (
        <Radio
          name={id}
          checked={value.selectedAnswer === option}
          onChange={(event) => {
            onChange({ selectedAnotherOption: false, selectedAnswer: option })
          }}
        >
          {(translated.options && translated.options[index]) || option}
        </Radio>
      ))}
      {hasAnotherOption && (
        <Radio
          style={{ color: "black!important" }}
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
