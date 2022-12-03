import React, { useState, Children } from "react";

import styles from "./Tabs.module.css";

interface TabsProps {
  buttons: string[];
  children: React.ReactNode;
}

export function Tabs({ buttons, children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {buttons.map((text, i) => {
          return (
            <button
              key={text}
              className={
                activeIndex === i ? styles.buttonActive : styles.button
              }
              onClick={() => {
                setActiveIndex(i);
              }}
            >
              {text.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className={styles.content}>
        {Children.map(children, (c, i) => {
          return (
            <div key={i} className={activeIndex === i ? undefined : styles.off}>
              {c}
            </div>
          );
        })}
      </div>
    </div>
  );
}
