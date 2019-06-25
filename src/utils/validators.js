const validateTextarea = (value) => {
  if (!value || !value.text) {
    return "Заполните поле"
  }
}

const validateCheckbox = (value) => {
  if (!value || !value.selectedAnswers || value.selectedAnswers.length === 0) {
    return "Выберите хотя бы одно поле"
  }
}

const validateRadioboxAndDropdown = (value) => {
  if (!value || !value.selectedAnswer) {
    return "Выберите хотя бы один ответ"
  }
}

export const validateAnswer = (type, value) => {
  if (type === "TEXTAREA") {
    return validateTextarea(value)
  }

  if (type === "MULTIPLE_CHOICE" || type === "DROPDOWN") {
    return validateRadioboxAndDropdown(value)
  }

  if (type === "CHECKBOX") {
    return validateCheckbox(value)
  }

  return "Неизвестная ошибка"
}
