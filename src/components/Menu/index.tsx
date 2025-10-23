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

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem("theme") as AvailableThemes) || "dark";
    return storageTheme;
  });

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
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink href="/" className={styles.menuLink}>
        <HouseIcon />
      </RouterLink>

      <RouterLink href="/hisory" className={styles.menuLink}>
        <HistoryIcon />
      </RouterLink>
      <RouterLink href="/settings" className={styles.menuLink}>
        <SettingsIcon />
      </RouterLink>
      <a
        href="#"
        className={styles.menuLink}
        onClick={(e) => handleChangeTheme(e)}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
