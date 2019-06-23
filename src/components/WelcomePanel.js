import React from "react"
import { Alert, Button, Div } from "@vkontakte/vkui"
import PropTypes from "prop-types"

const WelcomePanel = ({ title, description, onClick }) => {
  return (
    <Div
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        padding: 0,
      }}
    >
      <Alert onClose={() => console.log()}>
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
