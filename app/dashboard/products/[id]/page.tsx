"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductForm from "@/app/components/ProductForm";

export default function Page(props: any) {
    const [product, setProduct] = useState({});

    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/product/?id='+id).then(res => {
            console.log(res.data);
            setProduct(res.data);
        });
    }, [id]);

    return (
        <div className='bg-white'>
            <div className="px-4">
                <div className='text-xl font-bold'>
                    Edit Product
                </div>
                {/* <ProductForm {...product} /> */}
            </div>
        </div>
    )
}