"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";
import { Product } from "@/app/types/index";

export default function Page(props: any) {
    const [product, setProduct] = useState<Product>({
        _id: '',
        title: '',
        description: '',
        price: '',
        sizes: '',
    });

    const { id } = useParams();
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/product?id='+id).then(res => {
            console.log("product", res.data);
            setProduct(res.data);
        });
    }, [id]);

    return (
        <div className='bg-white'>
            <div className="px-4">
                <div className='text-xl font-bold'>
                    Edit Product
                </div>
                <ProductForm {...product} />
            </div>
        </div>
    )
}