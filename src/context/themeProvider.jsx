// local
import { CreateThemeContext } from "./createTheme";

// react
import { useState } from "react";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const theme = sessionStorage.getItem("theme")
        return theme ? theme : "dark"
    });

    const toggleTheme = () => {
        if (theme === "dark") {
            sessionStorage.setItem("theme", "light")
            setTheme("light")
        } else {
            sessionStorage.setItem("theme", "dark")
            setTheme("dark")
        }
    };

    return (
        <CreateThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </CreateThemeContext.Provider>
    )
}
