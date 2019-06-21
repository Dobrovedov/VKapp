import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const SubmitButton = ({ onClick, disabled }) => {
  return (
    <Button size="l" stretched onClick={onClick} disabled={disabled}>
      Завершить
    </Button>
  )
}

SubmitButton.defaultProps = {
  disabled: false,
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default SubmitButton
