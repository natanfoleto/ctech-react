import api from "./api";

export interface IGame {
  id: number;
  name: string;
  device: string;
  free: number;
  schedules: [
    {
      hour_start: string;
      hour_end: string;
    }
  ];
  banner_url: string | null;
}

export interface IFindAllResponse {
  status: string;
  message?: string;
  data: IGame[];
}

const findAll = async (): Promise<IFindAllResponse> => {
  const { data } = await api
    .get("/game")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAll };
