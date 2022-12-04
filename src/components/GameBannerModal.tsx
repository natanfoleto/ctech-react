import { X } from "phosphor-react";

import styles from "./GameBannerModal.module.css";

interface GameBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bannerUrl: string | null;
  title: string;
  modality: string;
  schedules: {
    hour_start: string;
    hour_end: string;
  }[];
}

export function GameBannerModal({
  isOpen,
  onClose,
  bannerUrl,
  title,
  modality,
  schedules,
}: GameBannerModalProps) {
  const id = "modal";

  function handleOutsideClick(e: any) {
    if (e.target.id === id) onClose();
  }

  return (
    <div
      id={id}
      onClick={handleOutsideClick}
      className={isOpen ? styles.container : styles.none}
    >
      <div className={styles.content}>
        <X className={styles.close} onClick={onClose} size={24} />

        <img
          src={
            bannerUrl
              ? bannerUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomRIT4OKajo2mGAToSVe48g_SBEMF3PJO1vRPLTJe420MpxJsj7McYZ57_ibN3UVgJrQ&usqp=CAU"
          }
          className={styles.cover}
        />

        <div className={styles.info}>
          <strong>{title}</strong>
          <span>{modality}</span>
          <div className={styles.schedules}>
            <strong>Horários de funcionamento</strong>

            {schedules.map((item) => (
              <div>
                <span>{item.hour_start}</span>
                <span>•</span>
                <span>{item.hour_end}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
