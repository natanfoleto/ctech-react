import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { findAllGames, IGame } from "../services/game";

import DefaultLayout from "../layouts/Default";

import { GameBanner } from "../components/GameBanner";
import { GameBannerModal } from "../components/GameBannerModal";

import styles from "./Games.module.css";

function Events() {
  const [games, setGames] = useState<IGame[]>();
  const [game, setGame] = useState<IGame>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function findSetAllGames() {
      const { status, message, data } = await findAllGames();

      if (status === "error") toast.error(message);
      if (status === "success") setGames(data);
    }

    findSetAllGames();
  }, []);

  function handleGameBanner() {
    setIsOpen(!isOpen);
  }

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Sala de Jogos</h2>
          <p>
            Se quiser saber onde a sala de jogos esta localizada, basta abrir o
            mapa do evento. Se ainda estiver com dificuldade pra achar, chame
            alguém pra te ajudar.
          </p>
        </div>

        <section className={styles.device}>
          <h2>PS4</h2>

          <div className={styles.games}>
            {games?.map((game) => {
              if (game.device === "PS4")
                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      setGame(game);
                      handleGameBanner();
                    }}
                  >
                    <GameBanner
                      bannerUrl={game.banner_url}
                      title={game.name}
                      modality={game.modality}
                    />
                  </div>
                );
            })}
          </div>
        </section>

        <section className={styles.device}>
          <h2>Xbox One</h2>

          <div className={styles.games}>
            {games?.map((game) => {
              if (game.device === "Xbox One")
                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      setGame(game);
                      handleGameBanner();
                    }}
                  >
                    <GameBanner
                      bannerUrl={game.banner_url}
                      title={game.name}
                      modality={game.modality}
                    />
                  </div>
                );
            })}
          </div>
        </section>

        <section className={styles.device}>
          <h2>Notebook</h2>

          <div className={styles.games}>
            {games?.map((game) => {
              if (game.device === "Notebook")
                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      setGame(game);
                      handleGameBanner();
                    }}
                  >
                    <GameBanner
                      bannerUrl={game.banner_url}
                      title={game.name}
                      modality={game.modality}
                    />
                  </div>
                );
            })}
          </div>
        </section>

        <section className={styles.device}>
          <h2>20000 Jogos</h2>

          <div className={styles.games}>
            {games?.map((game) => {
              if (game.device === "20000 Jogos")
                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      setGame(game);
                      handleGameBanner();
                    }}
                  >
                    <GameBanner
                      bannerUrl={game.banner_url}
                      title={game.name}
                      modality={game.modality}
                    />
                  </div>
                );
            })}
          </div>
        </section>
      </div>

      {game && (
        <div key={game.id}>
          <GameBannerModal
            isOpen={isOpen}
            onClose={handleGameBanner}
            bannerUrl={game.banner_url}
            title={game.name}
            modality={game.modality}
            schedules={game.schedules}
          />
        </div>
      )}
    </DefaultLayout>
  );
}

export default Events;
