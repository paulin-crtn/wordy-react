/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useMemo, useState } from "react";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import styles from "./QuizDefinition.module.scss";
import equal from "../../assets/img/equal.svg";
import notEqual from "../../assets/img/not_equal.svg";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizDefinition = ({
  data,
  checkChoice,
  pastChoices,
}: {
  data: IQuiz;
  checkChoice: (arg: IChoice) => void;
  pastChoices: string[];
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
        <div className={styles.pulledValue}>{data.pulled.value}</div>

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
                <img src={equal} alt="equal sign" />
                <span>{data.synonyms.join(", ")}</span>
              </div>
            )}
            {/** Antonyms */}
            {data.antonyms && data.antonyms.length > 0 && (
              <div className={styles.hint}>
                <img src={notEqual} alt="not equal sign" />
                <span>{data.antonyms.join(", ")}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/** Choices */}
      <div className={styles.choices}>
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
