import React from "react"
import PropTypes from "prop-types"
import { Div, Button } from "@vkontakte/vkui"

import useTranslation from "../hooks/useTranslate"

const WelcomePanel = ({ title, company, description, onClick, language }) => {
  const translatedTitle = useTranslation(title, language)
  const translatedDescription = useTranslation(description, language)
  const translatedButtonStart = useTranslation("Начать", language)

  return (
    <Div
      className="WelcomePage"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        paddingTop: "20vh",
        paddingRight: 30,
        paddingLeft: 30,
        textAlign: "center",
        color: "white",
      }}
    >
      <Div style={{ fontSize: "1.5em", marginBottom: 20 }}>
        {translatedTitle || title}
        {company && <Div style={{ fontSize: "0.4em" }}>by {company}</Div>}
      </Div>
      <Div
        style={{
          fontSize: "0.8em",
          maxHeight: "25vh",
          marginBottom: 20,
          overflow: "auto",
        }}
      >
        {translatedDescription || description}
      </Div>
      <Div>
        <Button
          size="l"
          style={{
            background: "none",
            border: "2px solid white",
            color: "white",
          }}
          stretched
          onClick={onClick}
        >
          {translatedButtonStart}
        </Button>
      </Div>
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
