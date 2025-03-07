import styles from "./AppHeader.module.css";
export const AppHeader = () => {
  return (
    <div className={styles.appHeaderConatiner}>
      <h1 className={styles.appHeaderTitle}>todos</h1>
    </div>
  );
};
