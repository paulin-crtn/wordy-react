/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { IQuiz } from "../../interfaces/IQuiz";
import { getQuizDefinition } from "../../services/quiz";
import styles from "./QuizDefinition.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizDefinition = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [data, setData] = useState<IQuiz>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    setIsLoading(true);
    getQuizDefinition()
      .then((response) => response.json())
      .then((data: IQuiz) => {
        setData(data);
        console.log("data: ", data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  function checkChoice(choice: IChoice) {
    console.log(choice);
  }

  interface IChoice {
    value: string;
    isCorrect: boolean;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <header>
        <Link to="/">
          <div className="logo">Wordy</div>
        </Link>
      </header>

      {isLoading && <Loader />}

      {!data && <div>Aucune donnée</div>}

      {data && (
        <div>
          <div className={styles.indication}>
            {/** Pulled */}
            <div className={styles.pulledValue}>{data.pulled.value}</div>
            {/** Synonyms */}
            {data.synonyms && data.synonyms.length > 0 && (
              <div className={styles.hint}>= {data.synonyms.join(", ")}</div>
            )}
            {/** Antonyms */}
            {data.antonyms && data.antonyms.length > 0 && (
              <div className={styles.hint}>≠ {data.antonyms.join(", ")}</div>
            )}
          </div>
          <div className={styles.choices}>
            {data.choices.map((choice: IChoice) => (
              <button
                className={styles.choiceButton}
                key={choice.value}
                onClick={() => checkChoice(choice)}
              >
                {choice.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
