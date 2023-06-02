import ProductForm from "@/app/components/ProductForm";

export default function Page() {
    return (
        <div>
           <div className='flex items-center mb-4'>
                <div className='text-sm font-medium'>
                    / dashboard / new 
                </div>
            </div>
            <ProductForm/>
        </div>
    )
}