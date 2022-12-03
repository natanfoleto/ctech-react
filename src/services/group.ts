import api from "./api";

export interface IGroup {
  id: number;
  name: string;
}

export interface ICreateGroupRequest {
  name: string;
}

export interface ICreateGroupResponse {
  status: string;
  message: string;
  data: IGroup;
}

export interface IUpdateGroupRequest {
  id: number;
  name: string;
}

export interface IUpdateGroupResponse {
  status: string;
  message: string;
}

export interface IDeleteGroupRequest {
  id: number;
}

export interface IDeleteGroupResponse {
  status: string;
  message: string;
}

export interface IFindAllGroupsResponse {
  status: string;
  message?: string;
  data: IGroup[];
}

const findAllGroups = async (): Promise<IFindAllGroupsResponse> => {
  const { data } = await api
    .get("/group")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const createGroup = async (
  params: ICreateGroupRequest
): Promise<ICreateGroupResponse> => {
  const { data } = await api
    .post("/group", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateGroup = async (
  params: IUpdateGroupRequest
): Promise<IUpdateGroupResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/group/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteGroup = async (
  params: IDeleteGroupRequest
): Promise<IDeleteGroupResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/group/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllGroups, createGroup, updateGroup, deleteGroup };
