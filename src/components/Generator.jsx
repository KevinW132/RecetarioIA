import { useState } from "react";

export default function Generator(props) {
    const { user } = props;
    const [promt, setPromt] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState(null);

    const handleGenerate = async () => {
        if (!promt.trim()) return;
        setLoading(true);
        setGeneratedRecipe(null);

        setTimeout(() => {
            setGeneratedRecipe({
                title: "Receta generada: Pasta con Salsa de Tomate 🍝",
                ingredients: [
                    "200g de pasta",
                    "2 tomates maduros",
                    "1 diente de ajo",
                    "Aceite de oliva",
                    "Sal y pimienta al gusto",
                ],
                steps: [
                    "Cocer la pasta al dente.",
                    "Preparar la salsa con tomate, ajo y aceite.",
                    "Mezclar la pasta con la salsa.",
                    "Servir caliente y disfrutar.",
                ],
            });
            setLoading(false);
        }, 1800);
        setPromt("");
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
                <textarea
                    value={promt}
                    onChange={(e) => setPromt(e.target.value)}
                    placeholder="Ejemplo: Quiero una cena rápida con pollo y arroz..."
                    className="w-full h-32 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 resize-none outline-none focus:ring-2 focus:ring-emerald-400 transition"
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
            {generatedRecipe && (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 mt-8 dark:bg-gray-800">
                    <h3 className="text-2xl font-semibold mb-4 text-emerald-500">
                        {generatedRecipe.title}
                    </h3>
                    <h4 className="font-medium mb-2">🥕 Ingredientes:</h4>
                    <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                        {generatedRecipe.ingredients.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <h4 className="font-medium mb-2">👨‍🍳 Pasos:</h4>
                    <ol className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                        {generatedRecipe.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            )}
        </main>
    );
}
