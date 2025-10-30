import { RouterLink } from "../RouterLink";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href="/about-pomodoro"> Conheça mais sobre o método pomodoro 🍅 </RouterLink>{" "}
      <span> Desenvolvido por lucasgsantos1727@gmail.com 🚀 </span>{" "}
    </footer>
  );
}
