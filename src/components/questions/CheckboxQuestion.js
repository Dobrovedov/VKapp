import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { Checkbox, Cell } from "@vkontakte/vkui"

import useTranslation from "../../hooks/useTranslation"

const CheckboxQuestion = ({
  id,
  title,
  description,
  options,
  value,
  onChange,
  hasAnotherOption,
  language,
}) => {
  const [chosenAnswers, setChosenAnswers] = useState(value.selectedAnswers)
  const isAnotherOptionChecked = chosenAnswers.some(
    (answer) => answer === "Другое",
  )

  const translated = useTranslation(
    {
      title,
      description,
      options,
    },
    language,
  )

  useEffect(() => {
    onChange({
      selectedAnotherOption: isAnotherOptionChecked,
      selectedAnswers: chosenAnswers,
    })
  }, [chosenAnswers])

  return (
    <>
      <Cell description={translated.description || description} multiline>
        {translated.title || title}
      </Cell>
      {options.map((option, index) => (
        <Checkbox
          value={option}
          defaultChecked={chosenAnswers.indexOf(option) !== -1}
          onChange={(event) => {
            if (event.target.checked) {
              setChosenAnswers([...chosenAnswers, event.target.value])
            } else {
              setChosenAnswers(
                chosenAnswers.filter((answer) => answer !== event.target.value),
              )
            }
          }}
        >
          {(translated.options && translated.options[index]) || option}
        </Checkbox>
      ))}
      {hasAnotherOption && (
        <Checkbox
          value={"Другое"}
          defaultChecked={chosenAnswers.indexOf("Другое") !== -1}
          onChange={(event) => {
            if (!isAnotherOptionChecked) {
              setChosenAnswers([...chosenAnswers, "Другое"])
            } else {
              setChosenAnswers(
                chosenAnswers.filter((answer) => answer !== "Другое"),
              )
            }
          }}
        >
          Другое
        </Checkbox>
      )}
    </>
  )
}

CheckboxQuestion.defaultProps = {
  value: {
    selectedAnotherOption: false,
    selectedAnswers: [],
  },
  hasAnotherOption: false,
}

CheckboxQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.object,
  description: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasAnotherOption: PropTypes.bool,
}

export default CheckboxQuestion
