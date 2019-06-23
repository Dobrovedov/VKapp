const validateTextAndTextarea = (value) => {
  if (!value || !value.text) {
    return "Заполните поле"
  }
}

const validateCheckboxAndDropdown = (value) => {
  if (!value || !value.selectedAnswers || value.selectedAnswers.length === 0) {
    return "Выберите хотя бы одно поле"
  }
}

const validateRadiobox = (value) => {
  if (!value || !value.selectedAnswer) {
    return "Выберите хотя бы один ответ"
  }
}

export const validateAnswer = (type, value) => {
  if (type === "TEXTAREA" || type === "TEXT") {
    return validateTextAndTextarea(value)
  }

  if (type === "MULTIPLE_CHOICE") {
    return validateRadiobox(value)
  }

  if (type === "CHECKBOX" || type === "DROPDOWN") {
    return validateCheckboxAndDropdown(value)
  }

  return "Неизвестная ошибка"
}
