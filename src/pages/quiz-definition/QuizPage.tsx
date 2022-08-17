/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { IQuiz } from "../../interfaces/IQuiz";
import { getQuizDefinition } from "../../services/quiz";
import { QuizDefinition } from "./QuizDefinition";
import styles from "./QuizPage.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizPage = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [data, setData] = useState<IQuiz>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [pastPulledId, setPastPulledId] = useState<string[]>([]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Each time a word or a definition is found, pastPulledId is updated
   */
  useEffect(() => getQuiz(), [pastPulledId]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  function getQuiz() {
    setIsLoading(true);
    setError("");
    // Fetch data
    getQuizDefinition(pastPulledId)
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.error);
        });
      })
      .then((data: IQuiz) => setData(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
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

      {error && <div>{error}</div>}

      {!data && !error && <div>Aucune donnée</div>}

      {!isLoading && data && (
        <QuizDefinition
          data={data}
          pastPulledId={pastPulledId}
          setPastPulledId={setPastPulledId}
        />
      )}
    </div>
  );
};
