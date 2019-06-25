import React from "react"
import PropTypes from "prop-types"

import { Cell, Input, Spinner, Textarea } from "@vkontakte/vkui"
import "@vkontakte/vkui/dist/vkui.css"

import useTranslation from "../../hooks/useTranslation"

const TextareaQuestion = ({
  id,
  title,
  placeholder,
  description,
  onChange,
  value,
  language,
  expanded,
}) => {
  const { translated, isLoading } = useTranslation(
    { title, description },
    language,
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Cell description={translated.description || description} multiline>
        {translated.title || title}
      </Cell>
      {expanded ? (
        <Textarea
          type="text"
          name={id}
          defaultValue={placeholder}
          onChange={(event) => {
            onChange({ text: event.target.value })
          }}
          value={value.text}
        />
      ) : (
        <Input
          type="text"
          name={id}
          defaultValue={placeholder}
          onChange={(event) => {
            onChange({ text: event.target.value })
          }}
          value={value.text}
        />
      )}
    </>
  )
}

TextareaQuestion.defaultProps = {
  value: {
    text: "",
  },
  expanded: false,
}

TextareaQuestion.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
}

export default TextareaQuestion
