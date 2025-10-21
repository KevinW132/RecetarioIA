import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Generator from "../components/Generator";

export default function Home() {
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
            <SideBar sideBar={sideBar} setSideBar={setSideBar} />
            <div className="flex-1 flex flex-col">
                <NavBar sideBar={sideBar} setSideBar={setSideBar} />
                <Generator user={user} />
            </div>
        </div>
    );
}
