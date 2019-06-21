import axios from "axios"

export const getSurvey = (id) =>
  axios.get(`https://foodtechmoneymaker.herokuapp.com/surveys/${id}`, {
    mode: "no-cors",
  })

export const sendAnswers = (response) =>
  axios.post(
    "https://foodtechmoneymaker.herokuapp.com/surveys/5d0c9be6222b28000470f9e9/responses",
    response,
    {
      mode: "no-cors",
    },
  )
