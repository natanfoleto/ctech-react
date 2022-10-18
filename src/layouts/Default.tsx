import React from "react";

import { Header } from "../components/Header";

import styles from "./Default.module.css";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
