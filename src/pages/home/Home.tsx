/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { QuizTypeButton } from "../../components/QuizTypeButton/QuizTypeButton";
import holiday from "../../assets/img/holiday.png";
import outerSpace from "../../assets/img/outer_space.png";
import styles from "./Home.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Home = () => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.logo}>Wordy</div>
        <h1>Développe ton vocabulaire en un rien de temps</h1>
        <h2>
          Quelques minutes de libre ? Profites-en pour apprendre ou réviser des
          mots rapidement sous forme de quiz
        </h2>
        <div className={styles.buttons}>
          <QuizTypeButton
            title="Mode Classique"
            subTitle="Trouve la définition associée au mot proposé"
            href="quiz/definition"
            img={holiday}
          ></QuizTypeButton>
          <QuizTypeButton
            title="Mode Inversé"
            subTitle="Trouve le mot associé à la définition proposée"
            href="quiz/word"
            img={outerSpace}
          ></QuizTypeButton>
        </div>
      </section>
    </div>
  );
};
