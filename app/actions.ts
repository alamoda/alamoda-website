'use server'

import { db } from "@/lib/db";
import { CartItem, SortOption } from "../lib";
import { CheckoutSessionSchema } from "./(ecommerce)/cart/page";
import { Validator } from "@/lib/util";
import Stripe from "stripe";
import { z } from "zod";

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

export async function createCheckoutLink(data: CheckoutSessionSchema): Promise<{ isValid: boolean, data: string, errors: Partial<Record<keyof CheckoutSessionSchema, string>> }> {

    console.log(data.cartItems.length);

    const validator = new Validator<CheckoutSessionSchema>(
        data,
        {
            email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email.' }).max(50),
        }
    );

    if (!(await validator.validate())) {
        return { isValid: false, data: "", errors: validator.errors };
    }

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    if (!stripe) throw new Error('cant load stripe');

    const line_items = [];
    const products = [];
    for (const cartItem of data.cartItems) {
        line_items.push({
            quantity: cartItem.quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: cartItem.product.name },
                unit_amount: cartItem.product.price * 100,
            },
        });
        products.push({
            id: cartItem.product.id,
            quantity: cartItem.quantity,
            size: cartItem.size
        })
    }

    const amount = data.cartItems.reduce((sum: number, cartItem: CartItem) => sum + cartItem.product.price * cartItem.quantity * 100, 3000);

    const order = await db.order.create({
        data: {
            cart_products: products,
            amount: amount,
            email: data.email,
            paid: false,
        }
    })

    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 3000,
                        currency: 'usd',
                    },
                    display_name: 'Standard shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 10,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 14,
                        },
                    },
                },
            },
        ],
        line_items,
        customer_email: data.email,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart?canceled`,
        metadata: { orderId: order.id }
    });

    return { isValid: true, data: JSON.stringify(session.url), errors: {} };
}
