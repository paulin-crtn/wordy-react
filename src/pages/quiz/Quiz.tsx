/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useMemo, useState } from "react";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import styles from "./Quiz.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Quiz = ({
  data,
  checkChoice,
  pastChoices,
  quizType,
}: {
  data: IQuiz;
  checkChoice: (arg: IChoice) => void;
  pastChoices: string[];
  quizType: string;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [showHint, setShowHint] = useState<boolean>(false);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const hasHint: boolean | undefined = useMemo(() => {
    return (
      (data.synonyms && data.synonyms.length > 0) ||
      (data.antonyms && data.antonyms.length > 0) ||
      (data.definitions && data.definitions.length > 0)
    );
  }, [data]);

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
          {data.pulled.value}
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
            {data.synonyms && data.synonyms.length > 0 && (
              <div className={styles.hint}>
                <div className="material-symbols-outlined">swap_horiz</div>
                <div className={styles.capitalize}>
                  {data.synonyms.join(", ")}
                </div>
              </div>
            )}
            {/** Antonyms */}
            {data.antonyms && data.antonyms.length > 0 && (
              <div className={styles.hint}>
                <div className="material-symbols-outlined">
                  do_not_disturb_on
                </div>
                <div className={styles.capitalize}>
                  {data.antonyms.join(", ")}
                </div>
              </div>
            )}
            {/** Definitions */}
            {data.definitions &&
              data.definitions.length > 0 &&
              data.definitions.map((definition) => (
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
        {data.choices.map((choice: IChoice) => (
          <button
            className="button"
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
