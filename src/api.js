import axios from "axios"

export const getSurvey = (id) =>
  axios.get(`https://foodtechmoneymaker.herokuapp.com/surveys/${id}`, {
    mode: "no-cors",
  })

export const sendAnswers = (id, response) =>
  axios.post(
    `https://foodtechmoneymaker.herokuapp.com/surveys/${id}/responses`,
    response,
    {
      mode: "no-cors",
    },
  )