'use server'

import { db } from "./(lib)/db";
import { SortOption } from "./(types)";

export async function getBrands() {
    const brands = await db.brand.findMany();
    return brands;
}

export async function countProducts(queryFilters: object[]) {

    const count = await db.product.count({
        where: {
            AND: queryFilters
        },
    });

    return count
}

export async function getProducts(queryFilters: object[], take: number, skip: number, orderBy: SortOption) {

    if (take > 60) {
        return [];
    }

    const products = await db.product.findMany({
        where: {
            AND: queryFilters
        },
        take: take,
        skip: skip,
        include: {
            brand: true,
        },
        orderBy: orderBy.filter
    });

    return products;
}

export async function getProduct(id: string, enforceAvailable: boolean) {

    try {
        const product = await db.product.findFirst({
            where: {
                id: id,
                available: enforceAvailable ? true : undefined
            },
            include: {
                brand: true,
            }
        });

        return product;

    }
    catch (err) {
        return null;
    }
}