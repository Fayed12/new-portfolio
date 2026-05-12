// local
import { CreateThemeContext } from "../context/createTheme"

// react
import { useContext } from "react"

export default function useTheme() {
    const { theme, toggleTheme } = useContext(CreateThemeContext)

    if (!theme || !toggleTheme) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return { theme, toggleTheme }
}