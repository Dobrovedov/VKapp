import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const SubmitButton = ({ onClick }) => {
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
      Завершить
    </Button>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default SubmitButton
