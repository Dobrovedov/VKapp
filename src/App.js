import React from "react"

import { Switch, Route } from "react-router-dom"
import AllProviders from "./AllProviders"

import SurveyPage from "./pages/SurveyPage"

const App = () => (
  <AllProviders>
    <Switch>
      <Route component={SurveyPage} />
    </Switch>
  </AllProviders>
)

export default App
