import { Link } from "react-router";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/about-pomodoro">Saiba mais sobre a técnica pomodoro</Link>
      <span> Desenvolvido por lucasgsantos1727@gmail.com 🚀 </span>{" "}
    </footer>
  );
}
