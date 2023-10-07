import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DEPARTMENTS } from "./constants";

import { Category, Department, ProductFilters } from '.';
import { ZodError, ZodRawShape, z } from 'zod';

export class Validator<T> {

    data: T;
    rules: ZodRawShape;
    errors: Partial<Record<keyof T, string>> = {};
    private isValidData: boolean = false;

    constructor(data: T, rules: ZodRawShape) {
        this.data = data;
        this.rules = rules;
    }

    async validate(): Promise<boolean> {

        // If we are not picking any values, validate everything.
        let zodValidator: any = z.object(this.rules);

        try {
            await zodValidator.parseAsync(this.data);
            this.isValidData = true;
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Partial<Record<keyof T, string>> = {};
                for (const { path, message } of error.errors) {
                    fieldErrors[path[0] as keyof T] = message;
                }


                this.errors = fieldErrors;
            }
            this.isValidData = false;
            return false;
        }
    }

    async refine(callback: (data: T) => Promise<void>): Promise<void> {
        await callback(this.data)
    }

    addIssue(key: keyof T, message: string): void {
        this.errors[key] = message;
        this.isValidData = false;
    }

    isValid(): boolean { return this.isValidData; }
};

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
        }
    ];

    if (productFilters.available !== undefined) {
        queryFilters.push(
            {
                available: productFilters.available
            }
        );
    }

    if (productFilters.department) {
        queryFilters.push(
            {
                department: productFilters.department.slug
            }
        );
    }

    if (productFilters.category) {
        queryFilters.push(
            {
                category: productFilters.category.slug,
            }
        );
    }

    if (productFilters.subcategories && productFilters.subcategories.length > 0) {
        queryFilters.push(
            {
                subcategory: {
                    in: productFilters.subcategories.map(subcategory => subcategory.slug)
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
                id: {
                    notIn: productFilters.exclude.map(product => product.id)
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

export function getDepartmentBySlug(departmentSlug: string | null) {
    if (!departmentSlug) return undefined

    return DEPARTMENTS.find((dept) => dept.slug === departmentSlug);
}

export function getCategoryBySlug(categorySlug: string | null, department: Department | undefined) {
    if (!categorySlug || !department) return undefined

    return department.categories.find((cat) => cat.slug === categorySlug);
}

export function getSubcategoryBySlug(subcategorySlug: string | null, category: Category | undefined) {
    if (!subcategorySlug || !category) return undefined

    return category.subcategories.find((sub) => sub.slug === subcategorySlug);
}

export function stringToBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    } else {
        return undefined;
    }
}