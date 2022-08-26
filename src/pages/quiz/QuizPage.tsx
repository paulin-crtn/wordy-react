/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Stats } from "../../components/Stats/Stats";
import { Information } from "../../components/Information/Information";
import { Quiz } from "./Quiz";
import { getQuiz } from "../../services/quiz";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import { QuizTypeEnum } from "../../enum/QuizTypeEnum";
import love from "../../assets/img/love.png";
import hug from "../../assets/img/hug.png";
import styles from "./QuizPage.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizPage = () => {
  /* -------------------------------- CONSTANT -------------------------------- */
  const NB_LIFE: number = 5;
  const { quizType } = useParams();
  const navigate = useNavigate();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [quiz, setQuiz] = useState<IQuiz>();
  const [pastChoices, setPastChoices] = useState<string[]>([]);
  const [lifeRemaining, setLifeRemaining] = useState<number>(NB_LIFE);
  const [isGameHover, setIsGameOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    Number(localStorage.getItem("wordy-best-score")) || 0
  );

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Check the URL param
   * Set the page title
   * Get and set the quiz
   */
  useEffect(() => {
    if (
      quizType !== QuizTypeEnum.DEFINITION &&
      quizType !== QuizTypeEnum.WORD
    ) {
      navigate("/");
    }
    document.title = `Find the ${quizType} | Wordy`;
    setQuiz(getQuiz(quizType as QuizTypeEnum));
  }, [quizType, navigate]);

  /**
   * Update best score
   */
  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
      localStorage.setItem("wordy-best-score", JSON.stringify(currentScore));
    }
  }, [currentScore, bestScore]);

  /* -------------------------------- FUNCTION -------------------------------- */
  function checkChoice(choice: IChoice) {
    if (choice.isCorrect) {
      setCurrentScore((currentScore) => currentScore + 1);
      setPastChoices([]);
      setQuiz(getQuiz(quizType as QuizTypeEnum));
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
    setQuiz(getQuiz(quizType as QuizTypeEnum));
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
          {quiz && !isGameHover && (
            <Quiz
              quiz={quiz}
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
