import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { RouterLink } from "../RouterLink";

type AvailableThemes = "light" | "dark";

const themesInPortuguese = {
  dark: "Escuro",
  light: "Claro",
};

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem("theme") as AvailableThemes) || "dark";
    return storageTheme;
  });
  const [nextTheme, setNextTheme] = useState<AvailableThemes>("dark");

  const nextThemeIcon = {
    light: <MoonIcon />,
    dark: <SunIcon />,
  };

  function handleChangeTheme(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    setNextTheme((prevTheme) => {
      const nextTheme = prevTheme != "dark" ? "dark" : "light";
      return nextTheme;
    });
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink aria-label="Ir para a página home" title="Ir para a página home" href="/" className={styles.menuLink}>
        <HouseIcon />
      </RouterLink>

      <RouterLink aria-label="Ir para o histórico" title="Ir para o histórico" href="/history" className={styles.menuLink}>
        <HistoryIcon />
      </RouterLink>
      <RouterLink aria-label="Ir para as configurações" title="Ir para as configurações" href="/settings" className={styles.menuLink}>
        <SettingsIcon />
      </RouterLink>
      <a
        aria-label={`Trocar tema para ${themesInPortuguese[nextTheme]}`}
        title={`Trocar tema para ${themesInPortuguese[nextTheme]}`}
        href="#"
        className={styles.menuLink}
        onClick={(e) => handleChangeTheme(e)}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
