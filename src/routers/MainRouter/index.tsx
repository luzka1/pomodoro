import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { HomePage } from "../../pages/Home";
import { NotFoundPage } from "../../pages/NotFound";
import { AboutPomodoroPage } from "../../pages/AboutPomodoro";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-pomodoro" element={<AboutPomodoroPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
