import { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";
import { signOut } from "../lib/authService";
import { supabase } from "../lib/supabaseClient";

export default function SideBar(props) {
    const { sideBar, setSideBar, user, setSelectedId } = props;
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) checkSavedRecipes();
    }, [user]);

    const checkSavedRecipes = async () => {
        setLoading(true);
        setRecipes(null);
        const { data, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (!error) setRecipes(data);
        setLoading(false);
    };

    const handleDelete = async (recipeId) => {
        await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("recipe_id", recipeId);
        setRecipes((prev) => prev.filter((r) => r.recipe_id !== recipeId));
    };

    const handleLogout = async () => {
        await signOut();
        window.location.reload();
    };
    return (
        <aside
            className={`fixed top-0 left-0 h-dvh bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 
                transition-all duration-300 ease-in-out z-40
                ${sideBar ? "translate-x-0 w-72" : "-translate-x-full w-72"}
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
                    <button
                        onClick={checkSavedRecipes}
                        className="bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition mb-4 w-[90%] mx-auto block"
                    >
                        🔃 Actualizar
                    </button>

                    <div className="flex-1 overflow-y-auto space-y-2 p-2">
                        {loading ? (
                            <p className="text-center text-gray-500">
                                Cargando...
                            </p>
                        ) : recipes.length === 0 ? (
                            <p className="text-center text-gray-500 mt-4">
                                No tienes recetas guardadas aún 🍳
                            </p>
                        ) : (
                            recipes.map((recipe) => (
                                <div
                                    key={recipe.recipe_id}
                                    className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-14 h-14 object-cover rounded-md"
                                        onClick={() =>
                                            setSelectedId(recipe.recipe_id)
                                        }
                                    />
                                    <div
                                        className="flex-1"
                                        onClick={() =>
                                            setSelectedId(recipe.recipe_id)
                                        }
                                    >
                                        <h3 className="text-sm font-medium truncate">
                                            {recipe.title.slice(0, 20)}...
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {new Date(
                                                recipe.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDelete(recipe.recipe_id)
                                        }
                                        className="text-red-500 hover:text-red-600 text-sm hover:scale-125"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))
                        )}
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
