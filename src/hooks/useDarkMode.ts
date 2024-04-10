import { useEffect, useState } from "react";

const matchDark = '(prefers-color-scheme: dark)';

export default function useDarkMode() {
    const [isDark, setIsDark] = useState(() => window.matchMedia && window.matchMedia(matchDark).matches);
    useEffect(() => {
        const mediaQuery = window.matchMedia(matchDark);

        const handleChange = () => {
            setIsDark(mediaQuery.matches)
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [setIsDark, isDark])


    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return { isDark, setIsDark }
}

