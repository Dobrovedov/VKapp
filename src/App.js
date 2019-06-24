import React, { useState, useEffect } from "react"
import SurveyPage from "./pages/SurveyPage"

import realConnect from "@vkontakte/vkui-connect"
import mockConnect from "@vkontakte/vkui-connect-mock"

import AskPrivacy from "./pages/AskPrivacy"

// Mocking connect
let connect = process.env.NODE_ENV === "production" ? realConnect : mockConnect

const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    connect.subscribe((e) => {
      setUser(e.detail.data)
    })
  }, [user])

  if (!user) {
    return (
      <AskPrivacy
        onPrivate={() => setUser({})}
        onPublic={() => {
          connect.send("VKWebAppGetUserInfo")
        }}
      />
    )
  }

  return <SurveyPage user={user} />
}

export default App
