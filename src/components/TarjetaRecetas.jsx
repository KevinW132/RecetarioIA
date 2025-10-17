export default function RecipeList({ recipes = [] }) {
    if (recipes === null) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No hay recetas disponibles aún 🍳
                <p className="text-sm mt-1">
                    Escribe algunos ingredientes y genera recetas.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

function RecipeCard({ recipe }) {
    return (
        <div className="bg-white dark:bg-gray-800 transition-all duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg">
            <img
                src={recipe.img}
                alt={recipe.title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {recipe.title}
                </h3>

                <div className="text-sm mb-2">
                    <h4 className="font-medium mb-2">
                        🥕 Ingredientes Faltantes:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                        {recipe.ingf.map((ingre, i) => (
                            <li key={i}>{ingre.name}</li>
                        ))}
                    </ul>
                    <h4 className="font-medium mb-2">
                        🍉 Ingredientes Usados:
                    </h4>
                    <ol className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                        {recipe.ingUs.map((ingre, i) => (
                            <li key={i}>{ingre.name}</li>
                        ))}
                    </ol>
                </div>

                <button
                    onClick={() =>
                        window.open(recipe.sourceUrl || "#", "_blank")
                    }
                    className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition"
                >
                    Ver receta
                </button>
            </div>
        </div>
    );
}
