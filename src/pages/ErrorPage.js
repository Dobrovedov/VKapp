import React from "react"
import { View, Panel, PanelHeader, Div } from "@vkontakte/vkui"
import ErrorPic from "../components/ErrorPic"

const ErrorPage = () => {
  return (
    <View>
      <Panel>
        <PanelHeader>404</PanelHeader>
        <Div
          style={{
            paddingTop: 30,
            paddingBottom: 60,
            color: "gray",
            textAlign: "center",
          }}
        >
          <h2>404 Страница не найдена</h2>
          <ErrorPic alt={"whoops"} />
          <p>Данный опрос уже закрыт или ещё не создан</p>
        </Div>
      </Panel>
    </View>
  )
}

export default ErrorPage
