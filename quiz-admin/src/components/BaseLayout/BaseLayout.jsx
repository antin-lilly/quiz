import React from "react";
import { Link } from "react-router-dom";
import styles from "./BaseLayout.module.css";

const BaseLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarItem}>
          <Link to="/quizes">Quizes</Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to="/questions">Questions</Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
