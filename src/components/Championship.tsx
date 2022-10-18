import styles from "./Championship.module.css";

export function Championship() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.head}>
          <img
            className={styles.cover}
            src="https://us.123rf.com/450wm/dolva/dolva1507/dolva150700009/43439811-symbol-competition-vs-vector-illustration-.jpg"
          />

          <div className={styles.titles}>
            <h2>Campeonatos</h2>
            <p>Participe, ganhe premios e insígnias</p>
          </div>
        </div>

        <p>Inscreva-se clicando no card!</p>
      </div>

      <div className={styles.right}>
        <span className={styles.info}>
          Para participar, inscreva-se no campeonato desejado. Não se esqueca de
          ler as especificações de cada um.
        </span>

        <div className={styles.games}>
          <ul>
            <li>League of Legends | Jogador solo</li>
            <li>Free Fire | Equipes de 4 a 5 jogadores</li>
            <li>Concurso de KPOP | Grupo de 3 a 6 kpoppers</li>
            <li>Concurso de Cosplay/Cosfun | Participante solo</li>
            <li>Torneios da Gaming Room | Equipes ou solo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
