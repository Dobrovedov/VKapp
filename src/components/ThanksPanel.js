import React from "react"
import { Div } from "@vkontakte/vkui"
import PropTypes from "prop-types"

const ThanksPanel = ({ confirmationMessage }) => {
  return (
    <Div
      style={{
        paddingTop: 30,
        paddingBottom: 40,
        color: "gray",
        textAlign: "center",
      }}
    >
      <h2>Опрос завершён</h2>
      <img
        className="Sticker"
        src={"../img/sticker/" + (Math.floor(Math.random() * 10) + 1) + ".png"}
        style={{
          display: "block",
          width: "50%",
          maxWidth: "240px",
          margin: "20px auto",
        }}
        alt="Sticker"
      />
      <p>{confirmationMessage}</p>
    </Div>
  )
}

ThanksPanel.propTypes = {
  confirmationMessage: PropTypes.string,
}

export default ThanksPanel
