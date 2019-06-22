import axios from "axios"

const token =
  "trnsl.1.1.20190622T182315Z.1c08f1b4d5342375.b70f9b65f37cf1d5176f32804b70c4d4fb35cd7c"

export const translateData = (data, lang) => {
  translateTitle(data, lang)
  translateDescription(data, lang)
}

export const getTranslation = (text, lang) =>
  axios.get(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?` +
      `key=${token}&` +
      `text=${text}&` +
      `lang=${lang}`,
  )

const translateTitle = (data, lang) =>
  getTranslation(data.meta.title, lang).then((res) => {
    data.meta.title = res.data.text[0]
  })

const translateDescription = (data, lang) =>
  getTranslation(data.meta.description, lang).then((res) => {
    data.meta.description = res.data.text[0]
  })
