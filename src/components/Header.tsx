import MenuWeb from "./MenuWeb";
import MenuMobile from "./MenuMobile";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <MenuWeb />
      <MenuMobile />
    </header>
  );
}
