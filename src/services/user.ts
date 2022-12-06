import api from "./api";

export interface IUser {
  id: number;
  name: string;
  username: string;
  phone: string;
  id_group: number;
  group: {
    name: string;
  };
  birth_date: string;
  created_at: string;
}

export interface ICreateUserRequest {
  username: string;
  name: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

export interface ICreateUserResponse {
  status: string;
  message: string;
  data: IUser;
}

export interface IUpdateUserRequest {
  id: number;
  name: string;
  phone: string;
  groupId: number;
}

export interface IUpdateUserResponse {
  status: string;
  message: string;
}

export interface IUpdatePasswordRequest {
  id: number;
  password: string;
  confirmPassword: string;
}

export interface IUpdatePasswordResponse {
  status: string;
  message: string;
}

export interface IDeleteUserRequest {
  id: number;
}

export interface IDeleteUserResponse {
  status: string;
  message: string;
}

export interface IFindAllUsersResponse {
  status: string;
  message?: string;
  data: IUser[];
}

const findAllUsers = async (): Promise<IFindAllUsersResponse> => {
  const { data } = await api
    .get("/user")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const createUser = async (
  params: ICreateUserRequest
): Promise<ICreateUserResponse> => {
  const { data } = await api
    .post("/user", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateUser = async (
  params: IUpdateUserRequest
): Promise<IUpdateUserResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/user/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updatePassword = async (
  params: IUpdatePasswordRequest
): Promise<IUpdatePasswordResponse> => {
  const { id } = params;

  const { data } = await api
    .patch(`/user/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteUser = async (
  params: IDeleteUserRequest
): Promise<IDeleteUserResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllUsers, createUser, updateUser, updatePassword, deleteUser };
