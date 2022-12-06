import api from "./api";

export interface IGroupPermission {
  id: number;
  name: string;
  lore: string;
  type: string;
}

export interface IUpdateGroupPermissionRequest {
  id: number;
  permissions: number[];
}

export interface IUpdateGroupPermissionResponse {
  status: string;
  message: string;
}

export interface IFindGroupPermissionRequest {
  id: number;
}

export interface IFindGroupPermissionResponse {
  status: string;
  message?: string;
  data: IGroupPermission[];
}

const findGroupPermissions = async (
  params: IFindGroupPermissionRequest
): Promise<IFindGroupPermissionResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/grouppermission/group/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateGroupPermission = async (
  params: IUpdateGroupPermissionRequest
): Promise<IUpdateGroupPermissionResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/grouppermission/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findGroupPermissions, updateGroupPermission };
