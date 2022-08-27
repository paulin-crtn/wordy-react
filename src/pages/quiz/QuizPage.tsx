/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../../components/Logo/Logo";
import { Stats } from "../../components/Stats/Stats";
import { Information } from "../../components/Information/Information";
import { Quiz } from "./Quiz";
import { getQuiz } from "../../services/quiz";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import { QuizTypeEnum } from "../../enum/QuizTypeEnum";
import { data } from "../../data";
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

  /* ----------------------------- REACT CALLBACK ----------------------------- */
  const nextQuiz = useCallback(() => {
    setQuiz(getQuiz(quizType as QuizTypeEnum, data));
  }, [quizType]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    // Check the URL param
    if (
      quizType !== QuizTypeEnum.DEFINITION &&
      quizType !== QuizTypeEnum.WORD
    ) {
      navigate("/");
    }
    // Set the page title
    document.title = `Find the ${quizType} | Wordy`;
    // Get and set the next quiz
    nextQuiz();
  }, [quizType, navigate, nextQuiz]);

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
      nextQuiz();
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
    nextQuiz();
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <header className={styles.header}>
        <Logo />
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
