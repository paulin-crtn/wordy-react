/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useCallback, useEffect, useState } from "react";
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

  /* ----------------------------- REACT CALLBACK ----------------------------- */
  const nextQuiz = useCallback((pastPulledId: string[]) => {
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
  }, []);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Each time a word or a definition is found, pastPulledId is updated
   */
  useEffect(() => nextQuiz(pastPulledId), [pastPulledId, nextQuiz]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <div className="logo">Wordy</div>
        </Link>
        <div className={styles.stats}>
          <div>score</div>
          <div>best</div>
          <div>life</div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
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
      </main>
    </div>
  );
};
