import { supabase } from "./supabaseClient";

export async function singnUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

export async function singnIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const { data, error } = await supabase.auth.signOut();
    if (error) throw error;
    return data;
}
