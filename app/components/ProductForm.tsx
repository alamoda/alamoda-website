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


const ProductForm = ({
    _id = '',
    title: existingTitle = '',
    description: existingDescription = '',
    price: existingPrice = '',
    sizes: existingSizes = '',
}) => {
    const [title, setTitle] = useState(existingTitle);
    const [description, setDescription] = useState(existingDescription);
    const [price, setPrice] = useState(existingPrice);
    const [sizes, setSizes] = useState(existingSizes);

    const router = useRouter();

    function createOrUpdateProduct() {
        if (_id) {
            axios.put('/api/product', { _id, title, description, price, sizes });
        } else {
            axios.post('/api/product', { title, description, price, sizes });
            router.push('/dashboard/products');
        }
    }

    async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target?.files;

        console.log("files are", files);
        if (files && files?.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();

                reader.onload = () => {
                    const fileData = reader.result;
                    console.log("filesData is", fileData);

                    const formData = new FormData();
                    if(fileData)
                        formData.append('image', new Blob([fileData]), files[i].name);
                    console.log("Data", formData);

                    axios.post('/api/upload', formData).then(res => {
                        console.log("response is", res.data);
                    });
                };

                reader.readAsArrayBuffer(files[i]);
            }

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

export default ProductForm;