import { Category, Department, ProductFilters } from "../(types)";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DEPARTMENTS } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

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
                    slug: productFilters.department.slug,
                },
            }
        );
    }

    if (productFilters.category) {
        queryFilters.push(
            {
                category: {
                    slug: productFilters.category.slug,
                },
            }
        );
    }

    if (productFilters.subcategories && productFilters.subcategories.length > 0) {
        queryFilters.push(
            {
                subcategory: {
                    slug: {
                        in: productFilters.subcategories.map(subcategory => subcategory.slug)
                    }
                }
            }
        );
    }

    if (productFilters.brands && productFilters.brands.length > 0) {
        queryFilters.push(
            {
                brand: {
                    slug: {
                        in: productFilters.brands.map(brand => brand.slug)
                    }
                }
            }
        );
    }

    if (productFilters.exclude && productFilters.exclude.length > 0) {
        queryFilters.push(
            {
                mongo_id: {
                    notIn: productFilters.exclude.map(product => product.mongo_id)
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

export function getURL(baseUrl: string, searchParams: { [key: string]: string | string[] | undefined }): URL {
    const url = new URL(baseUrl);

    for (const key in searchParams) {

        const value = searchParams[key];

        if (value !== undefined) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    url.searchParams.append(key, item);
                }
            } else {
                url.searchParams.set(key, value);
            }
        }
    }

    return url;
}

export function getDepartmentBySlug(departmentSlug: string | undefined) {
    if (!departmentSlug) return undefined

    return DEPARTMENTS.find((dept) => dept.slug === departmentSlug);
}

export function getCategoryBySlug(categorySlug: string | undefined, department: Department | undefined) {
    if (!categorySlug || !department) return undefined
    
    return department.categories.find((cat) => cat.slug === categorySlug);
}

export function getSubcategoryBySlug(subcategorySlug: string | undefined, category: Category | undefined) {
    if (!subcategorySlug || !category) return undefined
    
    return category.subcategories.find((sub) => sub.slug === subcategorySlug);
}