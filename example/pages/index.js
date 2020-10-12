import React from "react";
import styles from "./index.css";

export default function() {
  window.cordova.file.return(
    <div className={styles.normal}>
      <h1>Page index</h1>
    </div>
  );
}
