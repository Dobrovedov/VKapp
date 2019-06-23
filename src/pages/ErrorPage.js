import React from "react"
import { View, Panel, Div } from "@vkontakte/vkui"
import RandomErrorSticker from "../components/RandomErrorSticker"

const ErrorPage = () => {
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
          <h2>404 Страница не найдена</h2>
          <RandomErrorSticker alt={"whoops"} />
          <p>Данный опрос уже закрыт или ещё не создан</p>
        </Div>
      </Panel>
    </View>
  )
}

export default ErrorPage
