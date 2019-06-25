import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const NextButton = ({ onClick, disabled, text }) => {
  return (
    <Button size="l" stretched onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  )
}

NextButton.defaultProps = {
  disabled: false,
  text: "Далее",
}

NextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default NextButton
