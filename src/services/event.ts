import api from "./api";

export interface IEvent {
  id: number;
  name: string;
  notes: string;
  banner_url: string;
}

export interface ICreateEventRequest {
  name: string;
  notes: string;
  bannerUrl: string;
}

export interface ICreateEventResponse {
  status: string;
  message: string;
  data: IEvent;
}

export interface IUpdateEventRequest {
  id: number;
  name: string;
  notes: string;
  bannerUrl: string;
}

export interface IUpdateEventResponse {
  status: string;
  message: string;
}

export interface IDeleteEventRequest {
  id: number;
}

export interface IDeleteEventResponse {
  status: string;
  message: string;
}

export interface IFindAllEventsResponse {
  status: string;
  message?: string;
  data: IEvent[];
}

const createEvent = async (
  params: ICreateEventRequest
): Promise<ICreateEventResponse> => {
  const { data } = await api
    .post("/event", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateEvent = async (
  params: IUpdateEventRequest
): Promise<IUpdateEventResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/event/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteEvent = async (
  params: IDeleteEventRequest
): Promise<IDeleteEventResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/event/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findAllEvents = async (): Promise<IFindAllEventsResponse> => {
  const { data } = await api
    .get("/event")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllEvents, createEvent, updateEvent, deleteEvent };
