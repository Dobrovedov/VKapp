import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const NextButton = ({ onClick }) => {
  return (
    <Button size="l" stretched onClick={onClick}>
      Далее
    </Button>
  )
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default NextButton
