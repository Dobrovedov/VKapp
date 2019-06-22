import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { Checkbox, Cell, FormLayoutGroup } from "@vkontakte/vkui"

const CheckboxQuestion = ({
  id,
  title,
  description,
  options,
  value,
  onChange,
  hasAnotherOption,
}) => {
  const [chosenAnswers, setChosenAnswers] = useState(value.selectedAnswers)
  const isAnotherOptionChecked = chosenAnswers.some(
    (answer) => answer === "Другое",
  )
  useEffect(() => {
    onChange({
      selectedAnotherOption: isAnotherOptionChecked,
      selectedAnswers: chosenAnswers,
    })
  }, [chosenAnswers])

  return (
    <>
      <Cell description={description}>{title}</Cell>
      {options.map((option) => (
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
          {option}
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
