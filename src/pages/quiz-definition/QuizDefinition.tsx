/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useMemo, useState } from "react";
import { IChoice } from "../../interfaces/IChoice";
import { IQuiz } from "../../interfaces/IQuiz";
import styles from "./QuizDefinition.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizDefinition = ({
  data,
  pastPulledId,
  setPastPulledId,
}: {
  data: IQuiz;
  pastPulledId: string[];
  setPastPulledId: (arg: string[]) => void;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [pastChoices, setPastChoices] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const hasHint: boolean | undefined = useMemo(() => {
    return (
      (data.synonyms && data.synonyms.length > 0) ||
      (data.antonyms && data.antonyms.length > 0) ||
      (data.definitions && data.definitions.length > 0)
    );
  }, [data]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  function checkChoice(choice: IChoice) {
    if (choice.isCorrect) {
      setPastPulledId([...pastPulledId, data.pulled.documentId]);
      setPastChoices([]);
    } else {
      setPastChoices([...pastChoices, choice.value]);
    }
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div>
      <div className={styles.indication}>
        {/** Pulled */}
        <div className={styles.pulledValue}>{data.pulled.value}</div>

        {hasHint && !showHint && (
          <div
            className={styles.hintButton}
            onClick={() => setShowHint((showHint) => !showHint)}
          >
            Afficher des indices
          </div>
        )}

        {showHint && (
          <div>
            {/** Synonyms */}
            {data.synonyms && data.synonyms.length > 0 && (
              <div className={styles.hint}>= {data.synonyms.join(", ")}</div>
            )}
            {/** Antonyms */}
            {data.antonyms && data.antonyms.length > 0 && (
              <div className={styles.hint}>≠ {data.antonyms.join(", ")}</div>
            )}
          </div>
        )}
      </div>

      <div className={styles.choices}>
        {data.choices.map((choice: IChoice) => (
          <button
            className={styles.choiceButton}
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
