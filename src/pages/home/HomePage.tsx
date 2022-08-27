/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect } from "react";
import { Logo } from "../../components/Logo/Logo";
import { QuizTypeCard } from "../../components/QuizTypeCard/QuizTypeCard";
import holiday from "../../assets/img/holiday.png";
import outerSpace from "../../assets/img/outer_space.png";
import styles from "./HomePage.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const HomePage = () => {
  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Set the page title
   */
  useEffect(() => {
    document.title = "Wordy";
  }, []);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Logo />
        <h1>Développe ton vocabulaire en un rien de temps</h1>
        <h2>
          Quelques minutes de libre ? Profites-en pour apprendre ou réviser des
          mots rapidement sous forme de quiz
        </h2>
        <div className={styles.cards}>
          <QuizTypeCard
            title="Mode Classique"
            subTitle="Trouve la définition associée au mot proposé"
            link="quiz/definition"
            img={holiday}
          ></QuizTypeCard>
          <QuizTypeCard
            title="Mode Inversé"
            subTitle="Trouve le mot associé à la définition proposée"
            link="quiz/word"
            img={outerSpace}
          ></QuizTypeCard>
        </div>
      </div>
    </main>
  );
};
