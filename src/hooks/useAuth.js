import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        // Verificar si el usuario esta autenticado
        const session = supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setloading(false);
        });
        // COntrolar cuando el usuario inicia o cierra sesion
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
};
