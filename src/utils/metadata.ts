export function getPageAlternates(locale: string, path = "") {
    const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
    return {
        canonical: `/${locale}${cleanPath}`,
        languages: {
            "en-US": `/en${cleanPath}`,
            "vi-VN": `/vi${cleanPath}`,
            "x-default": `/en${cleanPath}`,
        },
    };
}