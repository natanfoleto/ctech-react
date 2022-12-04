import { useNavigate } from "react-router-dom";

import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/7405/7405885.png"
          className={styles.cover}
        />

        <aside className={styles.info}>
          <h1>401...</h1>
          <h2>Repito, 401. Câmbio!</h2>
          <h4>VOCÊ NÃO TEM CHAKRA SUFICIENTE:</h4>
          <span>
            <p>
              Acho que o seu chakra não é suficiente pra acessar esta página.
            </p>
            <p>A página que você requisitou não esta ao seu alcance.</p>
          </span>
          <button onClick={() => navigate("/")}>RETORNAR À HOME</button>
        </aside>
      </div>
    </div>
  );
}
