import { useNavigate } from "react-router-dom";

import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          className={styles.cover}
        />

        <aside className={styles.info}>
          <h1>404...</h1>
          <h2>Repito, 404. Câmbio!</h2>
          <h4>PÁGINA NÃO ENCONTRADA:</h4>
          <span>
            <p>Acho que você deu conta de se perder em Jaborandi.</p>
            <p>A página que você requisitou não foi encontrada.</p>
          </span>
          <button onClick={() => navigate("/")}>RETORNAR À HOME</button>
        </aside>
      </div>
    </div>
  );
}
