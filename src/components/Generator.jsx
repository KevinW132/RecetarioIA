import { useState } from "react";
import IngredientInputs from "./IngredientInputs";
import RecipeList from "./TarjetaRecetas";
import { searchRecipeByIngredients } from "../lib/spoonacularService";

export default function Generator(props) {
    const { user } = props;
    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState(null);

    const handleGenerate = async () => {
        let recetasObtenidas = [];
        setLoading(true);
        setRecipes(null);
        const recetas = await searchRecipeByIngredients(ingredients);
        recetas.forEach((y) => {
            const receta = {
                id: y.id,
                title: y.title,
                img: y.image,
                ingf: y.missedIngredients,
                ingUs: y.usedIngredients,
            };
            recetasObtenidas.push(receta);
        });
        setRecipes(recetasObtenidas);
        setIngredients([]);
        setLoading(false);
    };

    return (
        <main className="flex-1 flex flex-col items-center px-6 py-10 overflow-y-auto">
            <h2 className="text-3xl font-semibold mb-4 text-center">
                ¡Hola {user?.email?.split("@")[0]}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-lg">
                Describe los ingredientes que tienes o el tipo de comida que
                quieres preparar, y deja que la IA te proponga una receta
                deliciosa. 🥗
            </p>
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 dark:bg-gray-800">
                <IngredientInputs
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                />
                <button
                    onClick={handleGenerate}
                    className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                >
                    {loading
                        ? "Generando receta..."
                        : "🔍 Generar Receta con IA"}
                </button>
            </div>
            <RecipeList recipes={recipes} />
        </main>
    );
}
