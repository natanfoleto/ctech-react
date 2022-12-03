import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import Games from "../pages/Games";
import Profile from "../pages/Profile";
import Panel from "../pages/Panel";

import NotFound from "../pages/NotFound";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/games" element={<Games />} />
      <Route path="/me/:username" element={<Profile />} />
      <Route path="/panel" element={<Panel />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoutes;
