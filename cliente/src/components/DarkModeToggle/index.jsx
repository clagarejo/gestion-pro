import React, { useState, useEffect } from "react";
import "./styles.scss";

export const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("theme") || "light";
        setIsDarkMode(savedMode === "dark");
        document.body.classList.toggle("dark-mode", savedMode === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "🌙 " : "☀️ "}
        </button>
    );
};

