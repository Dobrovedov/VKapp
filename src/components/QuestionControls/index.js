import React from "react"
import PropTypes from "prop-types"

import NextButton from "./NextButton"
import SubmitButton from "./SubmitButton"
import BackButton from "./BackButton"

import { Div } from "@vkontakte/vkui"

const QuestionControls = ({
  onBack,
  onNext,
  onSubmit,
  isNextButtonDisabled,
  isLastQuestion,
  isFirstQuestion,
  translation,
}) => {
  return (
    <Div style={{ display: "flex" }}>
      {!isFirstQuestion && (
        <BackButton onClick={onBack} text={translation.backButton} />
      )}
      {!isLastQuestion ? (
        <NextButton
          onClick={onNext}
          disabled={isNextButtonDisabled}
          text={translation.nextButton}
        />
      ) : (
        <SubmitButton onClick={onSubmit} text={translation.submitButton} />
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
  translation: PropTypes.shape({
    nextButton: PropTypes.string,
    backButton: PropTypes.string,
    submitButton: PropTypes.string,
  }).isRequired,
}

export default QuestionControls
