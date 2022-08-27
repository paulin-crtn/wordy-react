/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Logo = () => {
  return (
    <Link to="/">
      <div className={styles.logo}>Wordy</div>
      <div className={styles.logoMobile}>W</div>
    </Link>
  );
};
