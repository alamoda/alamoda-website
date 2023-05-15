"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/index";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";
import DeleteButton from "@/app/components/DeleteButtons";

export default function Page(props: any) {
    const [product, setProduct] = useState({});

    const { id } = useParams();

    const router = useRouter();

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/product?id=' + id).then(res => {
            console.log("product is", res.data);
            setProduct(res.data);
        });
    }, [id]);

    function deleteProduct() {
        console.log("id is ", id);
        axios.delete('/api/product?id=' + id).then(res => {
            console.log("prduct deleted");
            router.push('/dashboard/products');
        });
    }

    return (
        <div className='bg-white'>
            <div className="px-4">
                <div className='text-xl font-bold'>
                    Edit Product
                </div>
                {Object.keys(product).length > 0 ? <ProductForm {...product} /> : null}
                <span className="ml-2">
                    <DeleteButton text="delete" onClick={deleteProduct}/>
                </span>
            </div>

        </div>
    )
}