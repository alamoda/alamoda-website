import { db } from "@/app/(lib)/db"
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

export async function POST(req: Request) {

    const {
        cartProducts
    } = await req.json();

    const line_items = [];
    for (const cartProduct of cartProducts) {
        line_items.push({
            quantity: cartProduct.quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: cartProduct.product.name },
                unit_amount: cartProduct.quantity * cartProduct.product.price,
            },
        });
    }

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
        mode: 'payment',
        success_url: 'http://localhost:3000/cart?success=1',
        cancel_url: 'http://localhost:3000/cart?canceled=1',
    });

    return new Response(JSON.stringify(session.url));
}