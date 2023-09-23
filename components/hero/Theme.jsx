// ThemeSwitcher.js
"use client";
import React, { useState } from "react";
import Image from "next/image";

const Theme = () => {
  const [theme, setTheme] = useState("light"); // Default theme is 'light'
  const [mountedComponent, setMountedComponent] = useState(false);

  React.useEffect(() => {
    setMountedComponent(true);
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkMode) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  if (!mountedComponent) return <div />;

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };
  return (
    <button>
      {theme === "dark" ? (
        <Image
          src="/dark_mode.svg"
          priority={true}
          alt="sun"
          width={24}
          height={24}
          onClick={toggleTheme}
        />
      ) : (
        <Image
          src="/light_mode.svg"
          priority={true}
          alt="moon"
          width={24}
          height={24}
          onClick={toggleTheme}
        />
      )}
    </button>
  );
};

export default Theme;
