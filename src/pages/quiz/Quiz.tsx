/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useMemo, useState, useEffect } from "react";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import styles from "./Quiz.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Quiz = ({
  quiz,
  checkChoice,
  pastChoices,
  isChoiceChecked,
  quizType,
}: {
  quiz: IQuiz;
  checkChoice: (arg: IChoice) => void;
  pastChoices: string[];
  isChoiceChecked: boolean;
  quizType: string;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [showHint, setShowHint] = useState<boolean>(false);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const hasHint: boolean | undefined = useMemo(() => {
    return (
      (quiz.synonyms && quiz.synonyms.length > 0) ||
      (quiz.antonyms && quiz.antonyms.length > 0) ||
      (quiz.definitions && quiz.definitions.length > 0)
    );
  }, [quiz]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => setShowHint(false), [quiz]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <div className={styles.indication}>
        {/** Pulled */}
        <div
          className={[
            styles.pulledValue,
            quizType === "definition" ? styles.capitalize : "",
          ].join(" ")}
        >
          {quiz.pulled}
        </div>

        {/** Hint */}
        {hasHint && !showHint && (
          <div
            className={styles.hintButton}
            onClick={() => setShowHint((showHint) => !showHint)}
          >
            <span className="material-symbols-outlined">contact_support</span>
            <span className={styles.hintButtonText}>Afficher des indices</span>
          </div>
        )}

        {showHint && (
          <div className={styles.hintWrapper}>
            {/** Synonyms */}
            {quiz.synonyms && quiz.synonyms.length > 0 && (
              <div className={styles.hint}>
                <div className="material-symbols-outlined">swap_horiz</div>
                <div className={styles.capitalize}>
                  {quiz.synonyms.join(", ")}
                </div>
              </div>
            )}
            {/** Antonyms */}
            {quiz.antonyms && quiz.antonyms.length > 0 && (
              <div className={styles.hint}>
                <div className="material-symbols-outlined">
                  do_not_disturb_on
                </div>
                <div className={styles.capitalize}>
                  {quiz.antonyms.join(", ")}
                </div>
              </div>
            )}
            {/** Definitions */}
            {quiz.definitions &&
              quiz.definitions.length > 0 &&
              quiz.definitions.map((definition) => (
                <div key={definition} className={styles.hint}>
                  <div className="material-symbols-outlined">add_circle</div>
                  <div>{definition}</div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/** Choices */}
      <div
        className={
          quizType === "word" ? styles.wordChoices : styles.definitionChoices
        }
      >
        {quiz.choices.map((choice: IChoice) => (
          <button
            className={[
              "button",
              choice.isCorrect && isChoiceChecked ? "buzz" : "",
            ].join(" ")}
            key={choice.value}
            onClick={() => checkChoice(choice)}
            disabled={pastChoices.includes(choice.value)}
          >
            {choice.value}
          </button>
        ))}
      </div>
    </div>
  );
};
