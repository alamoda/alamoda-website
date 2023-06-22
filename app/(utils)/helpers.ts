export function getIntParam(url: URL, name: string) {
    const intParam = url.searchParams.get(name);

    if (!intParam) return null

    const int = parseInt(intParam, 10);
    if (isNaN(int)) return null

    return int
};

export function getStrParam(url: URL, name: string) {
    const strParam = url.searchParams.get(name);

    if (!strParam) return null

    return strParam;
};

export function getBoolParam(url: URL, name: string) {
    const strParam = url.searchParams.get(name);

    if (!strParam) return null

    if (strParam.toLowerCase() === "true") return true

    if (strParam.toLowerCase() === "false") return false

    return null;
};