import React from "react"
import PropTypes from "prop-types"
import { Div, Group, Button } from "@vkontakte/vkui"

const WelcomePanel = ({ title, company, description, onClick }) => {
  return (
    <Div
      className="WelcomePage"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        paddingTop: 60,
        paddingRight: 30,
        paddingLeft: 30,
        paddingBottom: 60,
        textAlign: "center",
        color: "white",
      }}
    >
      <Div style={{ fontSize: "1.5em" }}>
        {title}
        <Div style={{ fontSize: "0.4em" }}>by {company}</Div>
      </Div>
      <Div
        style={{
          fontSize: "1em",
          height: "300px",
          marginBottom: 20,
          overflow: "auto",
        }}
      >
        {description}
      </Div>
      <Div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          right: 30,
        }}
      >
        <Button
          size="l"
          style={{
            background: "none",
            border: "2px solid white",
          }}
          stretched
          onClick={onClick}
        >
          Начать
        </Button>
      </Div>
    </Div>
  )
}

WelcomePanel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
}

export default WelcomePanel
