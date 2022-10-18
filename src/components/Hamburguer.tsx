import styles from "./Hamburguer.module.css";

interface Props {
  menuIsVisible: boolean;
  handleMenuMobile: () => void;
}

function Hamburguer({ menuIsVisible, handleMenuMobile }: Props) {
  return (
    <div
      className={menuIsVisible ? styles.close : styles.hamburguer}
      onClick={handleMenuMobile}
    >
      <span></span>
    </div>
  );
}

export default Hamburguer;
