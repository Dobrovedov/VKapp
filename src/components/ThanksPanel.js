import React, { useMemo } from "react"
import { Div } from "@vkontakte/vkui"
import PropTypes from "prop-types"

import useTranslate from "../hooks/useTranslate"

const ThanksPanel = ({ confirmationMessage, language }) => {
  const translatedTitle = useTranslate("Опрос завершён", language)
  const translatedConfirmationMessage = useTranslate(
    confirmationMessage,
    language,
  )

  const imgUrl = useMemo(
    () => `../img/sticker/${Math.floor(Math.random() * 10) + 1}.png`,
    [confirmationMessage],
  )

  return (
    <Div
      style={{
        paddingTop: 30,
        paddingBottom: 40,
        color: "gray",
        textAlign: "center",
      }}
    >
      <h2>{translatedTitle}</h2>
      <img
        className="Sticker"
        src={imgUrl}
        style={{
          display: "block",
          width: "50%",
          maxWidth: "240px",
          margin: "20px auto",
        }}
        alt="Thank You"
      />
      <p>{translatedConfirmationMessage || confirmationMessage}</p>
    </Div>
  )
}

ThanksPanel.propTypes = {
  confirmationMessage: PropTypes.string,
}

export default ThanksPanel
