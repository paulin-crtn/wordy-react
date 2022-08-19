/**
 * Get quiz from API
 *
 * @param quizType
 * @param documentIds
 * @returns
 */
export const getQuiz = (quizType: string, documentIds: string[]) => {
  return fetch(`${process.env.REACT_APP_API_URL}/quiz/${quizType}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `X-API-Key ${process.env.REACT_APP_API_KEY}`,
    }),
    body: JSON.stringify(documentIds),
  });
};
