import React from "react"
import { Alert, Button, Div } from "@vkontakte/vkui"
import PropTypes from "prop-types"

import useTranslation from "../hooks/useTranslate"

const WelcomePanel = ({ title, description, onClick, language }) => {
  const translatedTitle = useTranslation(title, language)
  const translatedDescription = useTranslation(description, language)
  const translatedButtonStart = useTranslation("Начать", language)

  return (
    <Div style={{ minHeight: "100vw", display: "flex", alignItems: "center" }}>
      <Alert>
        <h2>{translatedTitle || title}</h2>
        <p>{translatedDescription || description}</p>
        <Div style={{ display: "flex" }}>
          <Button size="l" stretched onClick={onClick}>
            {translatedButtonStart}
          </Button>
        </Div>
      </Alert>
    </Div>
  )
}

WelcomePanel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  language: PropTypes.string.isRequired,
}

export default WelcomePanel
