import { ProductFilters, SortOption } from "../(types)";
import { PRODUCT_SORT_OPTIONS } from "./constants";

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

export function prepareProductQueryFilters(productFilters: ProductFilters) {
    
    const queryFilters: object[] = [
        {
            status: {
                in: productFilters.statuses
            }
        },
        {
            available: productFilters.available
        }
    ];

    if (productFilters.department) {
        queryFilters.push(
            {
                department: {
                    slug: productFilters.department,
                },
            }
        );
    }

    if (productFilters.category) {
        queryFilters.push(
            {
                category: {
                    slug: productFilters.category,
                },
            }
        );
    }

    if (productFilters.subcategories) {
        queryFilters.push(
            {
                subcategory: {
                    slug: {
                        in: productFilters.subcategories
                    }
                }
            }
        );
    }

    if (productFilters.brands) {
        queryFilters.push(
            {
                brand: {
                    slug: {
                        in: productFilters.brands
                    }
                }
            }
        );
    }

    if (productFilters.exclude) {
        queryFilters.push(
            {
                mongo_id: {
                    notIn: productFilters.exclude
                }
            }
        );
    }

    if (productFilters.query) {
        queryFilters.push(
            {
                OR: [
                    {
                        name: {
                            contains: productFilters.query,
                            mode: "insensitive",
                        }
                    },
                    {
                        brand: {
                            name: {
                                contains: productFilters.query,
                                mode: "insensitive",
                            }
                        }
                    },
                ]
            }
        )
    }

    return queryFilters;
}