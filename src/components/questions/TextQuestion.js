import React from "react"
import PropTypes from "prop-types"

import { Cell, Textarea } from "@vkontakte/vkui"

const TextQuestion = ({
  id,
  title,
  placeholder,
  description,
  onChange,
  value,
}) => {
  return (
    <>
      <Cell description={description} multiline>
        {title}
      </Cell>
      <Textarea
        type="text"
        name={id}
        defaultValue={placeholder}
        onChange={(event) => {
          onChange({ text: event.target.value })
        }}
        value={value.text}
      />
    </>
  )
}

TextQuestion.defaultProps = {
  value: {
    text: "",
  },
}

TextQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.object,
  placeholder: PropTypes.string,
}

export default TextQuestion
