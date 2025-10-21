import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import RecipeDetail from "./pages/RecipeDetail";

export default function App() {
    const { user, loading } = useAuth();
    if (loading) return <div className="text-center mt-20">Cargando...</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
