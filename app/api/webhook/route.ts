import { db } from '@/lib/db';
import { Stripe } from 'stripe';

export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature');
    const endpointSecret = "whsec_b6f4ab9b39282469a9b3559c8a75d9072aae76576a7dbe41d8a4e78ee8212ab1";

    if (!sig || !endpointSecret) throw new Error('could not find stripe sig or secret');

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2022-11-15"
    });

    if (!stripe) throw new Error('cant load stripe');

    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (!event) throw new Error('cant create event');

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.orderId;
            const paid = session.payment_status === 'paid';
            const amount = session.amount_total || -1;
            const name = session.customer_details?.name || 'none';
            const line1 = session.shipping_details?.address?.line1;
            const line2 = session.shipping_details?.address?.line2;
            const street = line2 ? line1 + line2 : line1;
            const city = session.shipping_details?.address?.city || '';
            const state = session.shipping_details?.address?.state || '';
            const postalCode = session.shipping_details?.address?.postal_code || '';
            const country = session.shipping_details?.address?.country || '';
            if (orderId && paid) {
                await db.order.update({
                    where: { id: orderId },
                    data: {
                        amount,
                        name,
                        street,
                        city,
                        state,
                        postalCode,
                        country,
                        paid,
                    }
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return new Response();
}