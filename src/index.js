import React from "react"
import ReactDOM from "react-dom"
import connect from "@vkontakte/vkui-connect"
import App from "./App"

import "@vkontakte/vkui/dist/vkui.css"

connect.subscribe((e) => {
  switch (e.detail.type) {
    case "VKWebAppUpdateConfig":
      let schemeAttribute = document.createAttribute("scheme")
      schemeAttribute.value = e.detail.data.scheme
        ? e.detail.data.scheme
        : "client_light"
      document.body.attributes.setNamedItem(schemeAttribute)
      break
    default:
  }
})

// Init VK App
connect.send("VKWebAppInit", {})
ReactDOM.render(<App />, document.getElementById("root"))
