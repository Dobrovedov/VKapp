import React from "react"
import { View, Panel, Div } from "@vkontakte/vkui"
import RandomErrorSticker from "../components/RandomErrorSticker"

import useTranslate from "../hooks/useTranslate"

const ErrorPage = ({ language }) => {
  const translatedTitle = useTranslate("404 Страница не найдена", language)
  const translatedDescription = useTranslate(
    "Данный опрос уже закрыт или ещё не создан",
    language,
  )
  return (
    <View>
      <Panel>
        <Div
          style={{
            paddingTop: 30,
            paddingBottom: 60,
            color: "gray",
            textAlign: "center",
          }}
        >
          <h2>{translatedTitle}</h2>
          <RandomErrorSticker alt={"whoops"} />
          <p>{translatedDescription}</p>
        </Div>
      </Panel>
    </View>
  )
}

export default ErrorPage
