import { useEffect, useState } from "react";
import { MenuIcon } from "./Icons";

export default function NavBar(props) {
    const { sideBar, setSideBar } = props;
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <header className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSideBar(!sideBar)}
                    className={`p-2 z-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition ${
                        sideBar ? "hidden" : "block"
                    }`}
                    title={sideBar ? "Contraer" : "Expandir"}
                >
                    {sideBar ? "" : <MenuIcon />}
                </button>
                <h1 className="text-2xl font-semibold">🔍 Recetas IA</h1>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
                    title="Cambiar tema"
                >
                    {darkMode ? "☀" : "🌙"}
                </button>
            </div>
        </header>
    );
}
