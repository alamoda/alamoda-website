import ProductCard from '@/app/components/ProductCard';
import { Product } from '@/app/types';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products/women', {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();

    console.log(products);

    return (
        <>
            {products.map((product: Product) => (
                <>
                    <ProductCard product={product} />
                </>
            ))}
        </>
    )
}