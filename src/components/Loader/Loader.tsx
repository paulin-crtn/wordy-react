/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Loader = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [isServerStarting, setIsServerStarting] = useState<boolean>(false);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * If there is no data after 2 seconds we consider that Heroku is starting
   * the server (cold start after 30 minutes of inactivity).
   * As it might take up to 10 seconds we display a message to inform the user.
   */
  useEffect(() => {
    setTimeout(() => setIsServerStarting(true), 2000);
  }, []);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
      {isServerStarting && <p>Patience, le serveur démarre...</p>}
    </div>
  );
};
