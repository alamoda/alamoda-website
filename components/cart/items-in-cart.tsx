import { CartItem } from '@/lib';
import CartItemEntry from './cart-item-entry';

export default function CartOrderSummary({ cartItems }: { cartItems: CartItem[] }) {

    return (
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {cartItems.map((cartItem, index) => (
                    <CartItemEntry key={cartItem.product.id + cartItem.size.name} cartItem={cartItem} cartIndex={index} />
                ))}
            </ul>
        </section>
    )
}
