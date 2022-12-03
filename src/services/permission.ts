import api from "./api";

export interface IPermission {
  id: number;
  name: string;
  lore: string;
  type: string;
}

export interface ICreatePermissionRequest {
  name: string;
  lore: string;
  type: string;
}

export interface ICreatePermissionResponse {
  status: string;
  message: string;
  data: IPermission;
}

export interface IUpdatePermissionRequest {
  id: number;
  name: string;
  lore: string;
  type: string;
}

export interface IUpdatePermissionResponse {
  status: string;
  message: string;
}

export interface IDeletePermissionRequest {
  id: number;
}

export interface IDeletePermission2Response {
  status: string;
  message: string;
}

export interface IFindAllPermissionResponse {
  status: string;
  message?: string;
  data: IPermission[];
}

const findAllPermissions = async (): Promise<IFindAllPermissionResponse> => {
  const { data } = await api
    .get("/permission")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const createPermission = async (
  params: ICreatePermissionRequest
): Promise<ICreatePermissionResponse> => {
  const { data } = await api
    .post("/permission", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updatePermission = async (
  params: IUpdatePermissionRequest
): Promise<IUpdatePermissionResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/permission/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deletePermission = async (
  params: IDeletePermissionRequest
): Promise<IDeletePermission2Response> => {
  const { id } = params;

  const { data } = await api
    .delete(`/permission/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export {
  findAllPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};
