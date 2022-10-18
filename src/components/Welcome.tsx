import { useAuth } from "../contexts/authentication";

import styles from "./Welcome.module.css";

export function Welcome() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h2 className={styles.title}>Olá, {user?.name}</h2>

        <div className={styles.subtitle}>
          <p>É bom ter você aqui!</p>
          <p>O Nosso time está muito feliz com a sua presença.</p>
        </div>
      </div>

      <span>#GeekFestJaborandi</span>
    </div>
  );
}
