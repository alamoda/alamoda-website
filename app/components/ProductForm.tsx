"use client"

import { useState } from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";


const ProductForm = (props: Product) => {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price);
    const [sizes, setSizes] = useState(props.sizes);

    const router = useRouter();

    function createOrUpdateProduct() {
        const _id = props._id;
        if(_id) {
            axios.put('/api/product', { _id, title, description, price, sizes });
        } else {
            axios.post('/api/product', { title, description, price, sizes });
            router.push('/dashboard/products');
        }    
    }

    async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target?.files;
        if(files && files?.length > 0) {
            const data = new FormData();
            for(let i = 0; i < files.length; i++) {
                data.append('file', files[i]);                
            }
            const response = await axios.post('/api/upload', data);
            console.log(response.data);
        }
    }

    return (
        <>
            <PrimaryInput label="Name" placeholder="Name" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            <PhotoInput text="Product Images" onChange={uploadImages} />
            <PriceInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes(e.target.value)} />
            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

ProductForm.defaultProps = {
        _id: '',
        title: '',
        description: '',
        price: '',
        sizes: '',
}

export default ProductForm;