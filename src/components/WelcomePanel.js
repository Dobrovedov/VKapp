import React from "react"
import { Alert, Button, Div } from "@vkontakte/vkui"
import PropTypes from "prop-types"

const WelcomePanel = ({ title, description, onClick }) => {
  return (
    <Div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 99999,
        minWidth: "calc(100vw - 24px)",
        minHeight: "calc(100vh - 24px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Alert onClose={onClick}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Div style={{ display: "flex" }}>
          <Button size="l" stretched onClick={onClick}>
            Начать
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
}

export default WelcomePanel
