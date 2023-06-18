import { db } from "@/app/(lib)/db";
import { CartProduct } from "@/app/(types)";
import { time } from "console";
import { Stripe } from 'stripe';

export async function POST(req: Request) {

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    if (!stripe) throw new Error('cant load stripe');

    const {
        cartProducts,
        email
    } = await req.json();

    const line_items = [];
    const products = [];
    for (const cartProduct of cartProducts) {
        line_items.push({
            quantity: cartProduct.quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: cartProduct.product.name },
                unit_amount: cartProduct.product.price * 100,
            },
        });
        products.push({
            name: cartProduct.product.name,
            brand: cartProduct.product.brand.name,
            price: cartProduct.product.price,
            image: cartProduct.product.images[0],
            quantity: cartProduct.quantity,
            size: cartProduct.size.name
        })
    }

    const amount = cartProducts.reduce((sum: number, cartProduct: CartProduct) => sum + cartProduct.product.price * cartProduct.quantity, 0) + 30;

    const order = await db.order.create({
        data: {
            cart_products: products,
            amount,
            email,
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
        customer_email: email,
        mode: 'payment',
        success_url: 'http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cart?canceled',
        metadata: { orderId: order.mongo_id }
    });

    return new Response(JSON.stringify(session.url));
}