import React from "react"
import PropTypes from "prop-types"

import NextButton from "../components/NextButton"
import SubmitButton from "../components/SubmitButton"
import BackButton from "../components/BackButton"

import { Div } from "@vkontakte/vkui"

const QuestionControls = ({
  onBack,
  onNext,
  onSubmit,
  isNextButtonDisabled,
  isLastQuestion,
  isFirstQuestion,
}) => {
  return (
    <Div style={{ display: "flex" }}>
      {!isFirstQuestion && <BackButton onClick={onBack} />}
      {isLastQuestion ? (
        <NextButton onClick={onNext} disabled={isNextButtonDisabled} />
      ) : (
        <SubmitButton onClick={onSubmit} />
      )}
    </Div>
  )
}

QuestionControls.defaultProps = {
  isNextButtonDisabled: false,
}

QuestionControls.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onSubmit: PropTypes.func,
  isNextButtonDisabled: PropTypes.bool,
  isFirstQuestion: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
}

export default QuestionControls
