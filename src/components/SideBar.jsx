import { useState } from "react";
import { CloseIcon } from "./Icons";
import { signOut } from "../lib/authService";

export default function SideBar(props) {
    const { sideBar, setSideBar } = props;
    const [recipes] = useState([
        { id: 1, title: "Spaghetti al Pesto" },
        { id: 2, title: "Pollo al Curry" },
        { id: 3, title: "Smoothie de Fresa" },
    ]);

    const handleLogout = async () => {
        await signOut();
        window.location.reload();
    };
    return (
        <aside
            className={`fixed top-0 left-0 h-dvh bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 
                transition-all duration-300 ease-in-out z-40
                ${
                    sideBar
                        ? "translate-x-0 w-72 relative"
                        : "-translate-x-full w-72"
                }
            `}
        >
            <div className="flex flex-col h-dvh justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 p-7">
                        <button
                            onClick={() => setSideBar(!sideBar)}
                            className="p-2 z-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
                            title={sideBar ? "Contraer" : "Expandir"}
                        >
                            {sideBar ? <CloseIcon /> : ""}
                        </button>
                        <h2 className="text-xl font-semibold">
                            Mis Recetas 🍽️
                        </h2>
                    </div>

                    <button className="bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition mb-4 w-[90%] mx-auto block">
                        + Nueva receta
                    </button>

                    <div className="flex-1 overflow-y-auto space-y-2 p-2">
                        {recipes.map((r) => (
                            <div
                                key={r.id}
                                className="p-2 rounded-lg cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-800 transition"
                            >
                                {r.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 w-full">
                    <button
                        onClick={handleLogout}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition w-full"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </aside>
    );
}
