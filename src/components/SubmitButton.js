import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const SubmitButton = ({ onClick }) => {
  return (
    <Button size="l" level="commerce" stretched onClick={onClick}>
      Завершить
    </Button>
  )
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default SubmitButton
