import React from "react";
import { NavLink } from "react-router-dom";

import { GameController } from "phosphor-react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { PermissionGate } from "../components/PermissionGate";

import styles from "./Default.module.css";

interface DefaultLayoutProps {
  children: React.ReactNode;
  noResponsiveContent?: boolean;
  buttonPanel?: boolean;
}

export function DefaultLayout({
  children,
  noResponsiveContent = false,
  buttonPanel = true,
}: DefaultLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header />

      <div
        className={
          noResponsiveContent ? styles.containerNoResponsive : styles.container
        }
      >
        {children}
      </div>

      {buttonPanel && (
        <PermissionGate permissions={["admin-panel"]}>
          <div className={styles.panel}>
            <NavLink to={"/panel"}>
              <GameController size={36} color="#FFF" />
            </NavLink>
          </div>
        </PermissionGate>
      )}

      <Footer />
    </div>
  );
}

export default DefaultLayout;
