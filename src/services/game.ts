import api from "./api";

export interface IGame {
  id: number;
  name: string;
  device: string;
  free: string;
  schedules: [
    {
      hour_start: string;
      hour_end: string;
    }
  ];
  banner_url: string | null;
}

export interface IFindAllGamesResponse {
  status: string;
  message?: string;
  data: IGame[];
}

const findAllGames = async (): Promise<IFindAllGamesResponse> => {
  const { data } = await api
    .get("/game")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllGames };
