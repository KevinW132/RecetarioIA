import { useState } from "react";
import { singnIn, singnUp } from "../lib/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (isRegister) {
                await singnUp(email, password);
                alert("Usuario registrado exitosamente");
            } else {
                await singnIn(email, password);
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow w-96">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    {isRegister ? "Crear cuenta" : "Iniciar sesión"}
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Correo"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        disabled={loading}
                        className="bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                    >
                        {loading
                            ? "Cargando..."
                            : isRegister
                            ? "Registrar"
                            : "Entrar"}
                    </button>
                </form>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <p className="text-sm text-center mt-4">
                    {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-emerald-600 hover:underline font-medium"
                    >
                        {isRegister ? "Inicia sesión" : "Regístrate"}
                    </button>
                </p>
            </div>
        </div>
    );
}
