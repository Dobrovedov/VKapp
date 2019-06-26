import React from "react"
import ReactDOM from "react-dom"
import connect from "@vkontakte/vkui-connect"
import App from "./App"

import "@vkontakte/vkui/dist/vkui.css"

// Dark theme injecting
connect.subscribe((e) => {
  if (e.detail.type !== "VKWebAppUpdateConfig") {
    return
  }

  let schemeAttribute = document.createAttribute("scheme")
  schemeAttribute.value = e.detail.data.scheme
    ? e.detail.data.scheme
    : "client_light"
  document.body.attributes.setNamedItem(schemeAttribute)
})

// Init VK App
connect.send("VKWebAppInit", {})
connect.send("VKWebAppGetUserInfo")
ReactDOM.render(<App />, document.getElementById("root"))
