import { useEffect, useState } from "react";

const matchDark = '(prefers-color-scheme: dark)';

export default function useDarkMode() {
    const [isDark, setIsDark] = useState(() => window.matchMedia && window.matchMedia(matchDark).matches);
    useEffect(() => {
        const mediaQuery = window.matchMedia(matchDark);

        const handleChange = () => {
            setIsDark(mediaQuery.matches)
            handleToggleDarkModeClass(mediaQuery.matches)
        };

        const handleToggleDarkModeClass = (matches) => {
            if (matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };

        handleToggleDarkModeClass(isDark); // Initial setup

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [setIsDark, isDark])

    return { isDark, setIsDark }
}

