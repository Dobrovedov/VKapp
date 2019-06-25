import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const SubmitButton = ({ onClick, disabled, text }) => {
  return (
    <Button
      size="l"
      stretched
      onClick={onClick}
      style={{
        background: "#4bb34b",
        color: "white",
      }}
    >
      {text}
    </Button>
  )
}

SubmitButton.defaultProps = {
  disabled: false,
  text: "Завершить",
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default SubmitButton
