import axios from "axios"

export const getSurvey = (id) =>
  axios.get(`https://survey-app-itmo.herokuapp.com/surveys/${id}`, {
    mode: "no-cors",
  })

export const sendAnswers = (id, response, user) =>
  axios.post(
    `https://survey-app-itmo.herokuapp.com/surveys/${id}/responses`,
    { ...response, vkUser: user },
    {
      mode: "no-cors",
    },
  )

export const sendChangedAnswers = (surveyId, responseId, response, user) =>
  axios.put(
    `https://survey-app-itmo.herokuapp.com/surveys/${surveyId}/responses/${responseId}`,
    { ...response, vkUser: user },
    {
      mode: "no-cors",
    },
  )
