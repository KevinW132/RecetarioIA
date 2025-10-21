import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Generator from "../components/Generator";
import RecipePopup from "../components/RecipePopup";

export default function Home() {
    const [selectedId, setSelectedId] = useState(null);
    const [user, setUser] = useState(null);
    const [sideBar, setSideBar] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-300 text-gray-800 dark:text-gray-100">
            <SideBar
                sideBar={sideBar}
                setSideBar={setSideBar}
                user={user}
                setSelectedId={setSelectedId}
            />
            <div className="flex-1 flex flex-col">
                <NavBar sideBar={sideBar} setSideBar={setSideBar} />
                <Generator user={user} setSelectedId={setSelectedId} />
                {selectedId && (
                    <RecipePopup
                        recipeId={selectedId}
                        onClose={() => setSelectedId(null)}
                        user={user}
                    />
                )}
            </div>
        </div>
    );
}
