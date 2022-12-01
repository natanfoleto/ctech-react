import useGetUserPermissions from "../hooks/useGetUserPermissions";

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: string[];
}

export function PermissionGate({ children, permissions }: PermissionGateProps) {
  const userPermissions = useGetUserPermissions();

  if (
    permissions.some((permission) => {
      return userPermissions.includes(permission);
    })
  )
    return <>{children}</>;

  return null;
}
