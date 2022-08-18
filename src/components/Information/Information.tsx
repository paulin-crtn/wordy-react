/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import styles from "./Information.module.scss";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const Information = ({
  img,
  btnText,
  cb,
  text,
}: {
  img: string;
  btnText: string;
  cb: () => void;
  text?: string;
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <figure>
        <img src={img} alt="illustration" />
      </figure>

      {text && <div>{text}</div>}

      <button className="button" onClick={cb}>
        {btnText}
      </button>
    </div>
  );
};
