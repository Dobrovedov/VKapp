import { useState, useEffect } from "react"

import { translate } from "../translator"

const useTranslate = (text, language) => {
  const [translated, setTranslated] = useState()

  useEffect(() => {
    translate(text, language).then((res) => setTranslated(res.data.text[0]))
  }, [text, language])

  return translated
}

export default useTranslate
