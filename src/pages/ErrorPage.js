import React from "react"
import { View, Panel, Div } from "@vkontakte/vkui"
import ErrorPic from "../components/ErrorPic"

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
          <ErrorPic alt={"whoops"} />
          <p>Упс… Мы не можем найти то, что Вы ищете</p>
        </Div>
      </Panel>
    </View>
  )
}

export default ErrorPage
