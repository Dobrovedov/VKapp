const mockPoolList = [
  {
    id: "12XJWWr-Z8gkRdxrkwoU8CYg1h8GqWv3OJh-AOLzpyyQ",

    title: "Заголовок опроса",
    description: "Описание опроса",
    companyId: "",
    editorEmails: ["stevenschmatz@gmail.com"],
    confirmationMessage: "Thanks for submitting your contact info!",

    questions: [
      {
        type: "TEXTAREA",
        helpText: "Little description",
        placeholder: "",
        title: "Name",
        id: 1633920210,
        isRequired: false,
      },
      {
        type: "MULTIPLE_CHOICE",
        helpText: "",
        id: 1770822543,
        title: "How much do you like choices?",
        isRequired: false,
        hasOtherOption: true,
        placeholder: "",
        options: ["Option 1", "Option 2"],
      },
      {
        type: "CHECKBOX",
        helpText: "Description",
        id: 1846923513,
        title: "How much do you like checkboxes?",
        isRequired: false,
        hasOtherOption: true,
        placeholder: "",
        options: ["Option 1 Check", "Option 2 Check"],
      },
      {
        type: "DROPDOWN",
        helpText: "",
        id: 449887830,
        title: "How much do you like dropdowns?",
        isRequired: false,
        placeholder: "",
        options: [
          "Option 1 Dropdown",
          "Option 2 Dropdown",
          "Option 3 Dropdown",
        ],
      },
    ],
  },
]

export const getSurvey = (id) => {
  return mockPoolList.filter((survey) => survey.id === id)[0]
}

const transformIntoBackendFormat = (frontendAnswers) => {
  return {}
}

export const completeSurvey = (userAnswers) => {
  const answers = transformIntoBackendFormat(userAnswers)
}
