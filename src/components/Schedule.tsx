import { useNavigate } from "react-router-dom";

import styles from "./Schedule.module.css";

export function Schedule() {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <div className={styles.container}>
      <h2>Programações do evento</h2>

      <section>
        <div onClick={() => handleNavigate("/games")} className={styles.card}>
          <img src="https://wallpaperaccess.com/full/4334829.jpg" />

          <div className={styles.info}>
            <strong>Sala de jogos</strong>
            <span>Disponível das 9h às 18h</span>
          </div>
        </div>

        <div className={styles.card}>
          <img src="https://media.istockphoto.com/vectors/cartoon-treasure-map-vector-id517044403" />

          <div className={styles.info}>
            <strong>Mapa do evento</strong>
            <span>Veja para onde quer ir</span>
          </div>
        </div>
      </section>
    </div>
  );
}
