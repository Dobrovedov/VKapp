import React from "react"
import PropTypes from "prop-types"

import { Button } from "@vkontakte/vkui"

const BackButton = ({ onClick }) => {
  return (
    <Button size="l" stretched style={{ marginRight: 40 }} onClick={onClick}>
      Назад
    </Button>
  )
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BackButton
