import jwtDecode from "jwt-decode";

import { useAuth } from "../contexts/authentication";

interface TokenProps {
  tokenPayload: {
    id_group: number;
    permissions: {
      id: number;
      name: string;
      lore: string;
      type: string;
    }[];
    sub: number;
    iss: string;
  };
  iat: number;
  exp: number;
  sub: string;
}

const decodeToken = (): TokenProps => {
  const { token } = useAuth();

  const tokenDecoded = jwtDecode(token);

  return tokenDecoded as TokenProps;
};

export default decodeToken;
