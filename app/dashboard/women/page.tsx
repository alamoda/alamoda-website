import Products from '@/app/components/Products';

export default async function Page() {

    const response = await fetch('http://localhost:3000/api/products/women', {
        method: 'GET',
        cache: 'no-store',
    });

    const products = await response.json();

    console.log(products);

    return (
        <>
            <Products products={products} gender="women" />
        </>
    )
}