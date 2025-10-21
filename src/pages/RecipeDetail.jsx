import { useEffect, useState } from "react";
import { Links, useParams } from "react-router-dom";
/* import { getRecipeDetails } from "../lib/spoonacularService"; */

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const data = {
        image: "https://img.spoonacular.com/recipes/95-556x370.jpg",
        title: "Springtime Asparagus Pizza",
        readyInMinutes: "2 minutes",
        servings: "3",
        vegetarian: true,
        vegan: true,
        glutenFree: false,
        ingredients: [
            { name: "1 lb. asparagus" },
            { name: "2 cups of water" },
            { name: "1 cup of pizza sauce" },
            { name: "1/2 cup of olive oil" },
            { name: "Salt and pepper" },
        ],
        instructions:
            "Preheat oven to 400°F. Place asparagus in a single layer on a baking sheet. Drizzle with olive oil and season with salt and pepper. Roast for 10 minutes, until tender. Meanwhile, in a small bowl, whisk together pizza sauce, water, and olive oil. Pour over asparagus and toss to coat. Bake for 20 minutes, until hot and bubbly. Serve hot.",
        sourceUrl: "https://spoonacular.com/recipes/asparagus-pizza",
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                /* const res = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
                import.meta.env.VITE_SPOONACULAR_KEY
            }`
            )
            if (!res.ok) throw new Error("No se pudieron cargar los detalles.")
            const data = await res.json() */
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-6 dark:bg-slate-900 dark:text-emerald-700">
            <div className="max-w-4xl mx-auto">
                {/* <Links
                    to="/"
                    className="inline-block mb-4 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                >
                    ← Volver
                </Links> */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-72 object-cover"
                    />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-2">
                            {recipe.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <span>⏱ {recipe.readyInMinutes}</span>
                            <span>👨‍🍳 Porciones: {recipe.servings}</span>
                            {recipe.vegetarian && <span>🥦 Vegetariana</span>}
                            {recipe.vegan && <span>🌱 Vegana</span>}
                            {recipe.glutenFree && <span>🚫 Gluten</span>}
                        </div>
                        <h2 className="text-xl font-semibold mb-2">
                            🧂 Ingredientes
                        </h2>
                        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                            {recipe.ingredients.map((ingre, i) => (
                                <li key={i}>{ingre.name}</li>
                            ))}
                        </ul>
                        <h2 className="text-xl font-semibold mb-2">
                            📋 Instrucciones
                        </h2>
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
                                className="block text-center mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition"
                            >
                                Ver receta original
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
