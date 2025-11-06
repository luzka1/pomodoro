import type { ToastContentProps } from "react-toastify";
import styles from "./styles.module.css";
import { DefaultButton } from "../DefaultButton";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <div className={styles.container}>
      <p>{data}</p>

      <div className={styles.buttons}>
        <DefaultButton
          onClick={() => closeToast(true)}
          aria-label="Apagar histórico"
          title="Apagar histórico"
          icon={<CircleCheckBigIcon />}
        />

        <DefaultButton
          onClick={() => closeToast(false)}
          color="red"
          aria-label="Cancelar"
          title="Cancelar"
          icon={<CircleXIcon />}
        />
      </div>
    </div>
  );
}
