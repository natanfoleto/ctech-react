import { CaretUp } from "phosphor-react";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <span>Geek Fest Jaborandi - Todos os direitos reservados</span>

        <aside>
          <span>CTech 2022</span>

          <button
            className={styles.up}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <CaretUp />
          </button>
        </aside>
      </div>
    </footer>
  );
}
