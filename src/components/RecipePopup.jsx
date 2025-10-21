import { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";
import { getRecipeDetails } from "../lib/spoonacularService";
import { supabase } from "../lib/supabaseClient";

export default function RecipePopup(props) {
    const { recipeId, onClose, user } = props;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!recipeId) return;

        const fetchRecipe = async () => {
            try {
                const recetaDeApi = await getRecipeDetails(recipeId);
                const receta = {
                    image: recetaDeApi.image,
                    title: recetaDeApi.title,
                    readyInMinutes: recetaDeApi.readyInMinutes,
                    servings: recetaDeApi.servings,
                    vegetarian: recetaDeApi.vegetarian,
                    vegan: recetaDeApi.vegan,
                    glutenFree: recetaDeApi.glutenFree,
                    ingredients: recetaDeApi.extendedIngredients,
                    instructions: recetaDeApi.instructions,
                    sourceUrl: recetaDeApi.sourceUrl,
                };
                setRecipe(receta);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const chekIfSaved = async () => {
            if (!user) return;
            const favorito = await supabase
                .from("favorites")
                .select("*")
                .eq("recipe_id", recipeId)
                .eq("user_id", user.id);

            if (favorito.data.length > 0) setIsSaved(true);
        };

        fetchRecipe();
        chekIfSaved();
    }, [recipeId, user]);

    const handleSave = async () => {
        if (!user) {
            alert("Inicia sesión para guardar recetas.");
            return;
        }
        setSaving(true);
        if (isSaved) {
            await supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("recipe_id", recipeId);
            setIsSaved(false);
        } else {
            await supabase.from("favorites").insert({
                user_id: user.id,
                recipe_id: recipeId,
                title: recipe.title,
                image: recipe.image,
            });
            setIsSaved(true);
        }
        setSaving(false);
    };

    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 transition"
                >
                    <CloseIcon />
                </button>
                {loading ? (
                    <p className="text-center py-10 text-gray-500">
                        Cargando receta...
                    </p>
                ) : error ? (
                    <p className="text-center py-10 text-red-500">
                        Error: {error.message}
                    </p>
                ) : recipe ? (
                    <>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-60 object-cover rounded-t-2xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                {recipe.title}
                            </h2>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 items-center">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        isSaved
                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                            : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                >
                                    {saving
                                        ? "Guardando..."
                                        : isSaved
                                        ? "Guardado ✅"
                                        : "Guardar ⭐"}
                                </button>

                                <span>⏱️ {recipe.readyInMinutes} min</span>
                                <span>👨‍🍳 Porciones: {recipe.servings}</span>
                                {recipe.vegetarian && (
                                    <span>🥦 Vegetariana</span>
                                )}
                                {recipe.vegan && <span>🌱 Vegana</span>}
                                {recipe.glutenFree && (
                                    <span>🚫 Libre de gluten</span>
                                )}
                            </div>

                            <h3 className="text-lg font-semibold mb-2">
                                🧂 Ingredientes
                            </h3>
                            <ul className="list-disc list-inside space-y-1 mb-6">
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i}>{ing.original}</li>
                                ))}
                            </ul>

                            <h3 className="text-lg font-semibold mb-2">
                                📋 Instrucciones
                            </h3>
                            {recipe.instructions ? (
                                <div
                                    className="prose prose-sm dark:prose-invert"
                                    dangerouslySetInnerHTML={{
                                        __html: recipe.instructions,
                                    }}
                                />
                            ) : (
                                <p className="text-gray-500 italic">
                                    No hay instrucciones disponibles.
                                </p>
                            )}

                            {recipe.sourceUrl && (
                                <a
                                    href={recipe.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition"
                                >
                                    Ver receta original
                                </a>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
