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
        <div className={[styles.logo, "logo"].join(" ")}>Wordy</div>
        <div className={[styles.logoMobile, "logo-mobile"].join(" ")}>W</div>
      </Link>
      <div className={styles.stats}>
        <div>
          <span className="material-symbols-outlined stats">whatshot</span>
          <span>{currentScore}</span>
        </div>
        <div>
          <span className="material-symbols-outlined stats">
            vertical_align_top
          </span>
          <span>{bestScore}</span>
        </div>
        <div>
          <span className="material-symbols-outlined stats">favorite</span>
          <span>{lifeRemaining}</span>
        </div>
      </div>
    </header>
  );
};
