import { BrowserRouter as Router } from "react-router-dom";

import { useAuth } from "../contexts/authentication";

import DeauthRoutes from "./deauth";
import AuthRoutes from "./auth";

export function AppRoutes() {
  const { signed } = useAuth();

  return <Router>{signed ? <AuthRoutes /> : <DeauthRoutes />}</Router>;
}
