import { useState } from "react";
import { CloseIcon } from "./Icons";

export default function IngredientInputs(props) {
    const { ingredients, setIngredients } = props;
    const [input, setInput] = useState("");
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            if (!ingredients.includes(input.trim().toLowerCase())) {
                setIngredients([...ingredients, input.trim().toLowerCase()]);
            }
            setInput("");
        }
    };
    const removeIngredient = (item) => {
        setIngredients(ingredients.filter((i) => i !== item));
    };
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                Ingredientes
            </label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
                {ingredients.map((item, idx) => (
                    <span
                        key={idx}
                        className="flex items-center gap-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm transition-colors duration-300"
                    >
                        {item}

                        <button
                            onClick={() => removeIngredient(item)}
                            className="text-red-500 hover:text-red-700 ml-1"
                        >
                            <CloseIcon />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-100 transition-colors duration-300"
                    placeholder="Escribe un ingrediente y presiona enter"
                />
            </div>
        </div>
    );
}
