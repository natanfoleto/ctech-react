import api from "./api";

export interface IEvent {
  id: number;
  name: string;
  notes: string;
  banner_url: string;
  insignia: number;
  competition: number;
}

export interface IFindAllResponse {
  status: string;
  message?: string;
  data: IEvent[];
}

const findAll = async (): Promise<IFindAllResponse> => {
  const { data } = await api
    .get("/event")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAll };
