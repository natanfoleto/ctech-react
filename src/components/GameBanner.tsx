import styles from "./GameBanner.module.css";

interface GameBannerProps {
  bannerUrl: string | null;
  title: string;
  modality: string;
}

export function GameBanner({ bannerUrl, title, modality }: GameBannerProps) {
  return (
    <div className={styles.container}>
      <img
        src={
          bannerUrl
            ? bannerUrl
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomRIT4OKajo2mGAToSVe48g_SBEMF3PJO1vRPLTJe420MpxJsj7McYZ57_ibN3UVgJrQ&usqp=CAU"
        }
        className={styles.cover}
      />

      <div className={styles.content}>
        <strong>{title}</strong>
        <span>{modality}</span>
      </div>
    </div>
  );
}
