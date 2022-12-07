import React from "react";

import styles from "./Tabs.module.css";

interface TabsProps {
  buttons: string[];
  onClick: (tab: number) => void;
  currentTab: number;
  children: React.ReactNode;
}

export function Tabs({ buttons, onClick, currentTab, children }: TabsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {buttons.map((text, i) => {
          return (
            <button
              key={text}
              className={currentTab === i ? styles.buttonActive : styles.button}
              onClick={() => {
                onClick(i);
              }}
            >
              {text.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
