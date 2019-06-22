// Prepare survey answers
// To be send onto server
const prepareResponse = (surveyId, answers) => ({
  surveyId,
  checkId: "",
  answeredQuestionsNumber: Object.entries(answers).length,
  replies: Object.entries(answers).reduce(
    (acc, [id, value]) => [...acc, { questionId: id, ...value }],
    [],
  ),
})

export default prepareResponse
