import React from "react"
import PropTypes from "prop-types"
import { Div, Button } from "@vkontakte/vkui"

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
        paddingTop: "8vh",
        paddingRight: 30,
        paddingLeft: 30,
        textAlign: "center",
        color: "white",
      }}
    >
      <Div style={{ fontSize: "1.5em", marginBottom: 20 }}>
        {title}
        {company && <Div style={{ fontSize: "0.4em" }}>by {company}</Div>}
      </Div>
      <Div
        style={{
          fontSize: "0.8em",
          maxHeight: "30vh",
          marginBottom: 20,
          overflow: "auto",
        }}
      >
        {description}
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
