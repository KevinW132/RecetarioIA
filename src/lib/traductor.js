export async function traductorAlEps(wortoTranslator) {
    if (!wortoTranslator) return "";
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: wortoTranslator,
            source: "en",
            target: "es",
            format: "text",
        }),
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.translatedText;
}

export async function traductorAlIngles(wortoTranslator) {
    if (!wortoTranslator) return "";
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: wortoTranslator,
            source: "es",
            target: "en",
            format: "text",
        }),
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.translatedText;
}
