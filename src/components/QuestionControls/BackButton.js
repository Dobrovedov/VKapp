import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const BackButton = ({ onClick, text }) => {
  return (
    <Button size="l" stretched style={{ marginRight: 40 }} onClick={onClick}>
      {text}
    </Button>
  )
}

BackButton.defaultProps = {
  text: "Назад",
}

BackButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default BackButton
