/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { Link } from "react-router-dom";
import styles from "./QuizTypeButton.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const QuizTypeButton = ({
  title,
  subTitle,
  href,
  img,
}: {
  title: string;
  subTitle: string;
  href: string;
  img: string;
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Link to={href}>
      <button className={styles.container}>
        <img src={img} alt="" />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subTitle}>{subTitle}</p>
        </div>
      </button>
    </Link>
  );
};
