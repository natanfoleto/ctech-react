import api from "./api";
export interface ISignInRequest {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  id_group: number;
  username: string;
  name: string;
  birthDate: string;
  phone: string;
  createdAt: string;
}

export interface ISignInResponse {
  status: string;
  message: string;
  data: {
    token: string;
    refresh_token: string;
    user: IUser;
  };
}

const signInRequest = async (
  dataParam: ISignInRequest
): Promise<ISignInResponse> => {
  const { data } = await api
    .post("/session", dataParam)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { signInRequest };
