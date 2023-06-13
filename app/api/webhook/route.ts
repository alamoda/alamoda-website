import { db } from "@/app/(lib)/db";
import { Stripe } from 'stripe';

export async function POST(req: Request) {
    const payload = await req.json();
    const sig = req.headers.get('stripe-signature');
    const endpointSecret = process.env.STRIPE_SECRET;

    if(!sig || !endpointSecret) throw new Error('could not find stripe sig or secret');

    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    if (!stripe) throw new Error('cant load stripe');

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
    } catch (err) {
        return new Response(`Webhook Error: ${err}`, {
            status: 400
        });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.orderId;
            const paid = session.payment_status === 'paid';
            console.log("id", orderId, "paid", paid);
            if (orderId && paid) {
                await db.order.update({
                    where: { mongo_id: orderId },
                    data: {
                        paid: true,
                    }
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return new Response();
}