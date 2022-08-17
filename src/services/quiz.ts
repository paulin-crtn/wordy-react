export const getQuizDefinition = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/quiz/definition`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `X-API-Key ${process.env.REACT_APP_API_KEY}`,
    }),
  });
};
