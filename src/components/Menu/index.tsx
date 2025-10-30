import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

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
      <Link
        aria-label="Ir para Home"
        title="Ir para Home"
        to="/"
        className={styles.menuLink}
      >
        <HouseIcon />
      </Link>

      <a
        aria-label="Ir para Histórico"
        title="Ir para Histórico"
        href="#"
        className={styles.menuLink}
      >
        <HistoryIcon />
      </a>
      <a
        aria-label="Ir para Configurações"
        title="Ir para Configurações"
        href="#"
        className={styles.menuLink}
      >
        <SettingsIcon />
      </a>
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
