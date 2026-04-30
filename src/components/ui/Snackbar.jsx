import React from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ open, message, type = "error", onClose }) => {
  if (!open || !message) return null;

  return (
    <div className={`${styles.snackbar} ${styles[type]}`}>
      <span>{message}</span>
      <button type="button" onClick={onClose} className={styles.closeBtn}>
        x
      </button>
    </div>
  );
};

export default Snackbar;
