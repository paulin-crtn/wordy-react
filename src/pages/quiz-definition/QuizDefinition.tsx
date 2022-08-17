/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import { getQuizDefinition } from "../../services/quiz";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizDefinition = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    setIsLoading(true);
    getQuizDefinition()
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return <div>{JSON.stringify(data)}</div>;
};
