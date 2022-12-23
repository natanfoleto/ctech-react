import api from "./api";

export interface IQuest {
  id: number;
  name: string;
  objective: string;
  amount: number;
}

export interface IFindAllQuestsResponse {
  status: string;
  message?: string;
  data: IQuest[];
}

export interface ICreateQuestRequest {
  name: string;
  objective: string;
  amount: number;
}

export interface ICreateEventResponse {
  status: string;
  message: string;
  data: IQuest;
}

export interface IUpdateQuestRequest {
  id: number;
  name: string;
  objective: string;
  amount: number;
}

export interface IUpdateQuestResponse {
  status: string;
  message: string;
}

export interface IDeleteQuestRequest {
  id: number;
}

export interface IDeleteQuestResponse {
  status: string;
  message: string;
}

const findAllQuests = async (): Promise<IFindAllQuestsResponse> => {
  const { data } = await api
    .get("/quest")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const createQuest = async (
  params: ICreateQuestRequest
): Promise<ICreateEventResponse> => {
  const { name, objective, amount } = params;

  const { data } = await api.post("/quest", {
    name,
    objective,
    amount,
  });

  return data;
};

const updateQuest = async (
  params: IUpdateQuestRequest
): Promise<IUpdateQuestResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/quest/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteQuest = async (
  params: IDeleteQuestRequest
): Promise<IDeleteQuestResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/quest/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllQuests, createQuest, updateQuest, deleteQuest };
