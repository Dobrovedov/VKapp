import React from "react"
import PropTypes from "prop-types"

import { Progress } from "@vkontakte/vkui"

const ProgressBar = ({ value }) => {
  return <Progress value={value} />
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
}

export default ProgressBar
