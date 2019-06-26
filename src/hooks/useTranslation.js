import { useState, useEffect } from "react"
import { translate } from "../translator"

const useTranslation = ({ title, description, options }, language) => {
  const [translated, setTranslated] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const titlePromise = title && translate(title, language)
    const descriptionPromise = description && translate(description, language)
    const optionsPromise =
      (options && options.map((option) => translate(option, language))) || []

    Promise.all([titlePromise, descriptionPromise, ...optionsPromise]).then(
      ([title, description, ...options]) => {
        setTranslated({
          title: title && title.data.text[0],
          description: description && description.data.text[0],
          options: options && options.map((option) => option.data.text[0]),
        })
        setIsLoading(false)
      },
    )
  }, [title, description, options])

  return { translated, isLoading }
}

export default useTranslation
