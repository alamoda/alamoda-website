export function getIntParam(url: URL, name: string) {
    const limitParam = url.searchParams.get(name);

    if (!limitParam) return null

    const limit = parseInt(limitParam, 10);
    if (isNaN(limit)) return null

    return limit
}

export function getStrParam(url: URL, name: string) {
    const strParam = url.searchParams.get(name);

    if (!strParam) return null

    return strParam;
}

export function getBoolParam(url: URL, name: string) {
    const strParam = url.searchParams.get(name);

    if (!strParam) return null

    if (strParam.toLowerCase() === "true") return true

    if (strParam.toLowerCase() === "false") return false

    return null;
}