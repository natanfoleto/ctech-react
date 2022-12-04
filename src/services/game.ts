import api from "./api";

export interface IGame {
  id: number;
  name: string;
  device: string;
  modality: string;
  schedules: ISchedule[];
  banner_url: string | null;
}

export interface ISchedule {
  hour_start: string;
  hour_end: string;
}

export interface ICreateGameRequest {
  name: string;
  device: string;
  modality: string;
  schedules: ISchedule[];
  bannerUrl: string | null;
}

export interface ICreateGameResponse {
  status: string;
  message: string;
  data: IGame;
}

export interface IUpdateGameRequest {
  id: number;
  name: string;
  device: string;
  modality: string;
  schedules: ISchedule[];
  bannerUrl: string | null;
}

export interface IUpdateGameResponse {
  status: string;
  message: string;
}

export interface IDeleteGameRequest {
  id: number;
}

export interface IDeleteGameResponse {
  status: string;
  message: string;
}

export interface IFindAllGamesResponse {
  status: string;
  message?: string;
  data: IGame[];
}

const createGame = async (
  params: ICreateGameRequest
): Promise<ICreateGameResponse> => {
  const { data } = await api
    .post("/game", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateGame = async (
  params: IUpdateGameRequest
): Promise<IUpdateGameResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/game/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteGame = async (
  params: IDeleteGameRequest
): Promise<IDeleteGameResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/game/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findAllGames = async (): Promise<IFindAllGamesResponse> => {
  const { data } = await api
    .get("/game")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllGames, createGame, updateGame, deleteGame };
