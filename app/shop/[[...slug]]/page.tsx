async function getData(department: string | null, category: string | null, subcategory: string | null, skip: Number = 0) {

    const departementParam = department ? `department=${department}&` : ''
    const categoryParam = category ? `category=${category}&` : ''
    const subcategoryParam = subcategory ? `subcategory=${subcategory}&` : ''


    const res = await fetch(`http://localhost:3000/api/products?${departementParam}${categoryParam}${subcategoryParam}limit=10&skip=${skip}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export default async function Shop({ params }: { params: { slug: Array<string> } }) {

    const data = await getData(params.slug ? params.slug[0] : null, params.slug ? params.slug[1] : null, params.slug ? params.slug[2] : null);

    return (
        <div>
            {data.count}
            {data.products.map((product: any) => (
                <div className="py-2">
                    <h1 className="font-bold">{product.name}</h1>
                    <p className="text-xm lowercase">{product.department}</p>
                    <p className="text-xm lowercase">{product.category}</p>
                    <p className="text-xm lowercase">{product.subcategory}</p>
                </div>
            ))}
        </div>
    );
}