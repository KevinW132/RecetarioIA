const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE = "https://api.spoonacular.com";

export async function searchRecipeByIngredients(ingredients, number = 5) {
    const ing = ingredients.map((i) => i.trim()).join(",");
    const url = `${BASE}/recipes/findByIngredients?ingredients=${ing}&number=${number}&apiKey=${SPOONACULAR_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al buscar recetas");
    const data = await res.json();
    return data;
}

export async function getRecipeDetails(id) {
    const url = `${BASE}/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener detalles");
    const data = await res.json();
    return data;
}
