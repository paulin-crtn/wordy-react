/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Header = ({
  currentScore,
  bestScore,
  lifeRemaining,
}: {
  currentScore: number;
  bestScore: number;
  lifeRemaining: number;
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className="logo">Wordy</div>
      </Link>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className="material-symbols-outlined stats">track_changes</span>
          <span className={styles.statText}>Score actuel :</span>
          <span>{currentScore}</span>
        </div>
        <div className={styles.stat}>
          <span className="material-symbols-outlined stats">stars</span>
          <span className={styles.statText}>Meilleur score :</span>
          <span>{bestScore}</span>
        </div>
        <div className={styles.stat}>
          <span className="material-symbols-outlined stats">skull</span>
          <span className={styles.statText}>Vie restante :</span>
          <span>{lifeRemaining}</span>
        </div>
      </div>
    </header>
  );
};
