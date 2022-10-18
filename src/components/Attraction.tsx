import styles from "./Attraction.module.css";

export function Attraction() {
  return (
    <div className={styles.container}>
      <h2>Atrações</h2>

      <p>
        Confira todas as atrações do evento geek. Temos workshops,
        apresentações, sala de games, lojas, comidas, entrevistas e muito mais.
        Lembrando que nenhuma atração precisa de inscrição. Clique em saber
        mais, e veja quais são elas, e como você pode participar.
      </p>

      <button type="button">SABER MAIS</button>
    </div>
  );
}
