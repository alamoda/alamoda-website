import Link from 'next/link';

export function ContinueShopping({
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div {...props} >
            <Link href="/shop" className="text-sm font-medium text-gray-900 hover:text-gray-700 hover:underline">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
            </Link>
        </div>
    );
}
