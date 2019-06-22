import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const NextButton = ({ onClick, disabled }) => {
  return (
    <Button size="l" stretched onClick={onClick} disabled={disabled}>
      Далее
    </Button>
  )
}

NextButton.defaultProps = {
  disabled: false,
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default NextButton
