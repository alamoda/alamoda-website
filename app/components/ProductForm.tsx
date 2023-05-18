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
    images: existingImages = [],
}) => {
    const [title, setTitle] = useState<string>(existingTitle);
    const [description, setDescription] = useState<string>(existingDescription);
    const [price, setPrice] = useState<string>(existingPrice);
    const [sizes, setSizes] = useState<string>(existingSizes);
    const [images, setImages] = useState<string[]>(existingImages)

    const router = useRouter();

    function createOrUpdateProduct() {
        if (_id) {
            axios.put('/api/product', { _id, title, description, price, sizes, images });
        } else {
            axios.post('/api/product', { title, description, price, sizes, images });
            router.push('/dashboard/products');
        }
    }

    // Readsa the file and sends it to the backend
    async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target?.files;
        console.log("files are", files);

        const formData = new FormData();
        if (files && files?.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const fileData = await readFile(files[i]);
                console.log("filesData is", fileData);

                if (fileData) {
                    formData.append('image', new Blob([fileData]), files[i].name);
                }
            }

            const res = await axios.post('/api/upload', formData);
            console.log("images are ", res.data);

            setImages(oldImages => [...oldImages, ...res.data]);
        }
    }

    // Reads File and returns an ArrayBuffer
    const readFile = (file: File) => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const fileData = reader.result;
                resolve(fileData);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    };

    return (
        <>
            <PrimaryInput label="Name" placeholder="Name" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            {!!images?.length && images.map(link => (
                <div key={link} className="inline-block h-24 mr-2">
                    <img src={link} alt="" className="h-24"></img>
                </div>
            ))}
            <PhotoInput text="Product Images" onChange={uploadImages} />
            <PriceInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes(e.target.value)} />
            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

export default ProductForm;