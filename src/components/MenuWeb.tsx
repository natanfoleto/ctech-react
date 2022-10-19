import { NavLink, useNavigate } from "react-router-dom";
import { SignOut } from "phosphor-react";

import { useAuth } from "../contexts/authentication";

import styles from "./MenuWeb.module.css";

function MenuWeb() {
  const navigate = useNavigate();

  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();

    navigate("/");
  }

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/events", title: "Eventos" },
    { path: "/games", title: "Sala de Jogos" },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        {navItems.map((navItem, idx) => (
          <NavLink
            key={idx}
            to={navItem.path}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
            end
          >
            {navItem.title}
          </NavLink>
        ))}
      </nav>

      <aside className={styles.aside}>
        <NavLink to={"/profile"}>Meu perfil</NavLink>
        <button onClick={handleSignOut} className={styles.logout}>
          <SignOut />
          Logout
        </button>
      </aside>
    </div>
  );
}

export default MenuWeb;
