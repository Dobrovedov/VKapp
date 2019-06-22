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
        helpText: "Description for textarea",
        placeholder: "",
        title: "Name",
        id: 1633920210,
        isRequired: true,
      },
      {
        type: "MULTIPLE_CHOICE",
        helpText: "Description for radioboxes",
        id: 1770822543,
        title: "How much do you like choices?",
        isRequired: true,
        hasOtherOption: true,
        placeholder: "",
        options: ["I choose you!", "No, you!", "Never mind, you!"],
      },
      {
        type: "CHECKBOX",
        helpText: "Description for radio",
        id: 1846923513,
        title: "How much do you like checkboxes?",
        isRequired: true,
        hasOtherOption: true,
        placeholder: "",
        options: ["Gorgeous", "Majestic", "Palatial", "Fancy"],
      },
      {
        type: "DROPDOWN",
        helpText: "Description for dropdown",
        id: 449887830,
        title: "How much do you like dropdowns?",
        isRequired: true,
        placeholder: "",
        options: ["I love it <3", "So-so", "Nah, dispose of them"],
      },
    ],
  },
]

export default mockPoolList
