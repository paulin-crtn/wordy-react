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
  children,
}: {
  img: string;
  btnText: string;
  cb: () => void;
  children?: React.ReactNode;
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <figure>
        <img src={img} alt="illustration" />
      </figure>

      {children && <div>{children}</div>}

      <button className="button" onClick={cb}>
        {btnText}
      </button>
    </div>
  );
};
