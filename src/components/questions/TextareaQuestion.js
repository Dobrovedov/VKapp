import React, { useState } from "react"
import PropTypes from "prop-types"

import { Cell, Input } from "@vkontakte/vkui"
import "@vkontakte/vkui/dist/vkui.css"

const TextareaQuestion = ({
  id,
  title,
  placeholder,
  description,
  onChange,
}) => {
  return (
    <>
      <Cell>{title}</Cell>
      <Cell>{description}</Cell>
      <Input
        type="text"
        name={id}
        defaultValue={placeholder}
        onChange={(event) => {
          onChange({ text: event.target.value })
        }}
      />
    </>
  )
}

TextareaQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  mandatory: PropTypes.bool,
}

export default TextareaQuestion
