import api from "./api";

export interface IEvent {
  id: number;
  name: string;
  notes: string;
  banner_url: string;
}

export interface IFindAllResponse {
  status: string;
  message?: string;
  data: IEvent[];
}

const findAllEvents = async (): Promise<IFindAllResponse> => {
  const { data } = await api
    .get("/event")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllEvents };
