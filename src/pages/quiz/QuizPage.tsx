/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Loader } from "../../components/Loader/Loader";
import { Information } from "../../components/Information/Information";
import { Quiz } from "./Quiz";
import { getQuiz } from "../../services/quiz";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import styles from "./QuizPage.module.scss";
import love from "../../assets/img/love.png";
import scared from "../../assets/img/scared.png";
import tired from "../../assets/img/tired.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizPage = () => {
  /* -------------------------------- CONSTANT -------------------------------- */
  const NB_LIFE: number = 5;
  const { quizType } = useParams();
  const navigate = useNavigate();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<IQuiz>();
  const [pastChoices, setPastChoices] = useState<string[]>([]);
  const [pastPulledId, setPastPulledId] = useState<string[]>(
    JSON.parse(localStorage.getItem("wordy-pulled-ids") || "[]")
  );
  const [lifeRemaining, setLifeRemaining] = useState<number>(NB_LIFE);
  const [isGameHover, setIsGameOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    Number(localStorage.getItem("wordy-best-score")) || 0
  );

  /* ----------------------------- REACT CALLBACK ----------------------------- */
  const nextQuiz = useCallback(
    (pastPulledId: string[]) => {
      setIsLoading(true);
      setError("");
      // Fetch data
      getQuiz(quizType as string, pastPulledId)
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
    },
    [quizType]
  );

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Check the URL param and set the page title
   */
  useEffect(() => {
    if (quizType !== "definition" && quizType !== "word") {
      navigate("/");
    }
    document.title = `Find the ${quizType} | Wordy`;
  }, [quizType, navigate]);

  /**
   * Call nextQuiz each time pastPulledId is updated
   * (i.e each time a word or a definition is found)
   */
  useEffect(() => nextQuiz(pastPulledId), [pastPulledId, nextQuiz]);

  /**
   * Each time the current score is updated,
   * we check and/or update the best score
   */
  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
      localStorage.setItem("wordy-best-score", JSON.stringify(currentScore));
    }
  }, [currentScore, bestScore]);

  /* -------------------------------- FUNCTION -------------------------------- */
  function checkChoice(choice: IChoice) {
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
      localStorage.setItem(
        "wordy-pulled-ids",
        JSON.stringify([...pastPulledId, data.pulled.documentId])
      );
    } else {
      if (lifeRemaining) {
        setPastChoices((pastChoices) => [...pastChoices, choice.value]);
        setLifeRemaining((lifeRemaining) => lifeRemaining - 1);
      } else {
        setIsGameOver(true);
      }
    }
  }

  function replayGame() {
    setCurrentScore(0);
    setPastChoices([]);
    setLifeRemaining(NB_LIFE);
    setIsGameOver(false);
    nextQuiz(pastPulledId);
  }

  function resetGame() {
    localStorage.removeItem("wordy-best-score");
    localStorage.removeItem("wordy-pulled-ids");
    window.location.reload();
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <Header
        currentScore={currentScore}
        bestScore={bestScore}
        lifeRemaining={lifeRemaining}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          {isLoading && <Loader />}

          {!isLoading && error && (
            <Information
              img={tired}
              btnText="Réinitialiser le jeu"
              cb={resetGame}
            >
              {error}
            </Information>
          )}

          {!isLoading && !error && !data && (
            <Information
              img={tired}
              btnText="Réinitialiser le jeu"
              cb={resetGame}
            >
              Aucune donnée
            </Information>
          )}

          {!isLoading && data && isGameHover && (
            <Information
              img={currentScore === bestScore ? love : scared}
              btnText="Rejouer"
              cb={replayGame}
            >
              {currentScore === bestScore
                ? "Félicitation pour ton meilleur score !"
                : `${currentScore} points ! Tu as déjà fait mieux que ça...`}
            </Information>
          )}

          {!isLoading && data && !isGameHover && (
            <Quiz
              data={data}
              checkChoice={checkChoice}
              pastChoices={pastChoices}
              quizType={quizType as string}
            />
          )}
        </div>
      </main>
    </div>
  );
};
