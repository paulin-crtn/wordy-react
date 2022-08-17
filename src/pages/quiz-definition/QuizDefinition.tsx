import React, { useEffect, useState } from "react";

export const QuizDefinition = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/quiz/definition`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `X-API-Key ${process.env.REACT_APP_API_KEY}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};
