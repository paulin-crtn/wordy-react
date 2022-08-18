/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import { getQuizDefinition } from "../../services/quiz";
import { QuizDefinition } from "./QuizDefinition";
import styles from "./QuizPage.module.scss";
import choc from "../../assets/img/choc.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizPage = () => {
  /* -------------------------------- CONSTANT -------------------------------- */
  const NB_LIFE: number = 5;

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<IQuiz>();
  const [pastChoices, setPastChoices] = useState<string[]>([]);
  const [pastPulledId, setPastPulledId] = useState<string[]>([]);
  const [lifeRemaining, setLifeRemaining] = useState<number>(NB_LIFE);
  const [isGameHover, setIsGameOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    Number(localStorage.getItem("wordy-best-score")) || 0
  );

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

  /**
   * Each time the current score is updated, we check and/or update the best score
   */
  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
      localStorage.setItem("wordy-best-score", JSON.stringify(currentScore));
    }
  }, [currentScore, bestScore]);

  /* -------------------------------- FUNCTION -------------------------------- */
  function checkChoice(choice: IChoice) {
    console.log(pastChoices);

    if (!data) {
      return;
    }
    if (choice.isCorrect) {
      setCurrentScore((currentScore) => currentScore + 1);
      setPastChoices([]);
      setPastPulledId((pastPulledId) => [
        ...pastPulledId,
        data.pulled.documentId,
      ]);
    } else {
      if (lifeRemaining) {
        setPastChoices((pastChoices) => [...pastChoices, choice.value]);
        setLifeRemaining((lifeRemaining) => lifeRemaining - 1);
      } else {
        setIsGameOver(true);
      }
    }
  }

  function resetGame(pastPulledId: string[]) {
    setCurrentScore(0);
    setPastChoices([]);
    setLifeRemaining(NB_LIFE);
    setIsGameOver(false);
    nextQuiz(pastPulledId);
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <div className="logo">Wordy</div>
        </Link>
        <div className={styles.stats}>
          <div>
            <span className="material-symbols-outlined stats">moving</span>
            <span>{currentScore}</span>
          </div>
          <div>
            <span className="material-symbols-outlined stats">stars</span>
            <span>{bestScore}</span>
          </div>
          <div>
            <span className="material-symbols-outlined stats">favorite</span>
            <span>{lifeRemaining}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {isLoading && <Loader />}

          {error && !isLoading && <div>{error}</div>}

          {!error && !isLoading && !data && <div>Aucune donnée</div>}

          {!isLoading && data && isGameHover && (
            <div className={styles.information}>
              <figure>
                <img src={choc} alt="choc" />
              </figure>
              <button
                className="button"
                onClick={() => resetGame(pastPulledId)}
              >
                Rejouer
              </button>
            </div>
          )}

          {!isLoading && data && !isGameHover && (
            <QuizDefinition
              data={data}
              checkChoice={checkChoice}
              pastChoices={pastChoices}
            />
          )}
        </div>
      </main>
    </div>
  );
};
