/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Stats } from "../../components/Stats/Stats";
import { Information } from "../../components/Information/Information";
import { Quiz } from "./Quiz";
import { buildQuiz } from "../../services/quiz";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import styles from "./QuizPage.module.scss";
import love from "../../assets/img/love.png";
import hug from "../../assets/img/hug.png";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizPage = () => {
  /* -------------------------------- CONSTANT -------------------------------- */
  const NB_LIFE: number = 5;
  const { quizType } = useParams();
  const navigate = useNavigate();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [data, setData] = useState<IQuiz>(buildQuiz(quizType as string));
  const [pastChoices, setPastChoices] = useState<string[]>([]);
  const [pastPulledId, setPastPulledId] = useState<string[]>(
    JSON.parse(localStorage.getItem("wordy-pulled-words") || "[]")
  );
  const [lifeRemaining, setLifeRemaining] = useState<number>(NB_LIFE);
  const [isGameHover, setIsGameOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    Number(localStorage.getItem("wordy-best-score")) || 0
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
      setPastPulledId((pastPulledId) => [...pastPulledId, data.pulled]);
      localStorage.setItem(
        "wordy-pulled-ids",
        JSON.stringify([...pastPulledId, data.pulled])
      );
      setData(buildQuiz(quizType as string));
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
    setData(buildQuiz(quizType as string));
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <div className="logo">Wordy</div>
          <div className="logo-mobile">W</div>
        </Link>
        <Stats
          currentScore={currentScore}
          bestScore={bestScore}
          lifeRemaining={lifeRemaining}
        />
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {!isGameHover && (
            <Quiz
              data={data}
              checkChoice={checkChoice}
              pastChoices={pastChoices}
              quizType={quizType as string}
            />
          )}

          {isGameHover && (
            <Information
              img={currentScore === bestScore ? love : hug}
              btnText="Rejouer"
              cb={replayGame}
            >
              {currentScore === bestScore
                ? `Félicitation pour ton meilleur score de ${bestScore} points !`
                : `Bien joué pour ton score de ${currentScore} points !`}
            </Information>
          )}
        </div>
      </main>
    </div>
  );
};
