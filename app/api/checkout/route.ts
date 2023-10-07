
import { CartItem } from '@/lib';
import { db } from '@/lib/db';
import { Stripe } from 'stripe';

export async function POST(req: Request) {

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    if (!stripe) throw new Error('cant load stripe');

    const {
        cartItems,
        email
    } = await req.json();

    const line_items = [];
    const products = [];
    for (const cartItem of cartItems) {
        line_items.push({
            quantity: cartItem.quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: cartItem.product.name },
                unit_amount: cartItem.product.price * 100,
            },
        });
        products.push({
            name: cartItem.product.name,
            brand: cartItem.product.brand.name,
            price: cartItem.product.price,
            image: cartItem.product.images[0],
            quantity: cartItem.quantity,
            size: cartItem.size.name
        })
    }

    const amount = cartItems.reduce((sum: number, cartItem: CartItem) => sum + cartItem.product.price * cartItem.quantity * 100, 3000);

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
        success_url: `${process.env.NEXT_PUBLIC_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart?canceled`,
        metadata: { orderId: order.id }
    });

    return new Response(JSON.stringify(session.url));
}