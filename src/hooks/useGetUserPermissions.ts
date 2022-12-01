import decodeToken from "../utils/decodeToken";

const useGetUserPermissions = () => {
  const tokenDecoded = decodeToken();

  const payload = tokenDecoded.tokenPayload;

  const permissions = payload.permissions.map((permission) => {
    return permission.name;
  });

  return permissions;
};

export default useGetUserPermissions;
