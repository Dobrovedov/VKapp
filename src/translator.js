import axios from "axios"

const token =
  "trnsl.1.1.20190622T182315Z.1c08f1b4d5342375.b70f9b65f37cf1d5176f32804b70c4d4fb35cd7c"

export const translate = (text, lang) =>
  axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
    params: {
      key: token,
      text,
      lang,
    },
  })

export const translateSurveyMeta = async (survey, language) => {
  if (!survey.meta) {
    return
  }
  const title = (await translate(survey.meta.title, language)).data.text[0]
  const description = (await translate(survey.meta.description, language)).data
    .text[0]
  // const confirmationMessage = (await translate(
  //   survey.meta.confirmationMessage,
  //   language,
  // )).text

  return {
    title,
    description,
    // confirmationMessage,
  }
}
