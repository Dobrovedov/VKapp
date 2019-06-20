import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { Checkbox, Cell } from "@vkontakte/vkui"

const CheckboxQuestion = ({
  id,
  title,
  description,
  options,
  onChange,
  hasAnotherOption,
}) => {
  const [chosenAnswers, setChosenAnswers] = useState([])
  const [isAnotherOptionChecked, setIsAnotherOptionChecked] = useState(false)

  useEffect(() => {
    onChange({
      selectedAnotherOption: isAnotherOptionChecked,
      selectedAnswers: chosenAnswers,
    })
  }, [chosenAnswers])

  return (
    <>
      <Cell>{title}</Cell>
      {options.map((option) => (
        <Checkbox
          value={option}
          onChange={(event) => {
            setChosenAnswers([...chosenAnswers, event.target.value])

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
          onChange={(event) => {
            setIsAnotherOptionChecked(true)
            setChosenAnswers([...chosenAnswers, "Другое"])
          }}
        >
          Другое
        </Checkbox>
      )}
    </>
  )
}

CheckboxQuestion.defaultProps = {
  mandatory: false,
  hasAnotherOption: false,
}

CheckboxQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasAnotherOption: PropTypes.bool,
}

export default CheckboxQuestion
