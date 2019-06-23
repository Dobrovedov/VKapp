import axios from "axios"

const token =
  "trnsl.1.1.20190622T182315Z.1c08f1b4d5342375.b70f9b65f37cf1d5176f32804b70c4d4fb35cd7c"

export const translateData = (data, lang) => {
  translateTitle(data, lang)
  translateDescription(data, lang)
  translateConfirmationMessage(data, lang)
  translateQuestions(data, lang)
}

export const getTranslation = (text, lang) =>
  axios.get(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?` +
      `key=${token}&` +
      `text=${text}&` +
      `lang=${lang}`,
  )

const translateTitle = (data, lang) =>
  data.meta.title !== ""
    ? getTranslation(data.meta.title, lang).then((res) => {
        data.meta.title = res.data.text[0]
      })
    : null

const translateDescription = (data, lang) =>
  data.meta.description !== ""
    ? getTranslation(data.meta.description, lang).then((res) => {
        data.meta.description = res.data.text[0]
      })
    : null

const translateConfirmationMessage = (data, lang) =>
  data.meta.confirmationMessage !== ""
    ? getTranslation(data.meta.confirmationMessage, lang).then((res) => {
        data.meta.confirmationMessage = res.data.text[0]
      })
    : null

const translateQuestions = (data, lang) => {
  for (let i in data.questions) {
    translateQuestionTitle(data, i, lang)
    translateQuestionHelpText(data, i, lang)
    translateQuestionPlaceholder(data, i, lang)
    translateOptions(data, i, lang)
  }
}

const translateOptions = (data, index, lang) => {
  for (let i in data.questions[index].options) {
    translateQuestionOption(data, index, i, lang)
  }
}

const translateQuestionTitle = (data, index, lang) =>
  data.questions[index].title !== ""
    ? getTranslation(data.questions[index].title, lang).then((res) => {
        data.questions[index].title = res.data.text[0]
      })
    : null

const translateQuestionHelpText = (data, index, lang) =>
  data.questions[index].helpText !== ""
    ? getTranslation(data.questions[index].helpText, lang).then((res) => {
        data.questions[index].helpText = res.data.text[0]
      })
    : null

const translateQuestionPlaceholder = (data, index, lang) =>
  data.questions[index].placeholder !== ""
    ? getTranslation(data.questions[index].placeholder, lang).then((res) => {
        data.questions[index].placeholder = res.data.text[0]
      })
    : null

const translateQuestionOption = (data, queIndex, optIndex, lang) =>
  data.questions[queIndex].options[optIndex] !== ""
    ? getTranslation(data.questions[queIndex].options[optIndex], lang).then(
        (res) => {
          data.questions[queIndex].options[optIndex] = res.data.text[0]
        },
      )
    : null
