"use client"

import { useState } from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";


const ProductForm = ({
    _id = '',
    name: existingName = '',
    description: existingDescription = '',
    price: existingPrice = 0,
    category: existingCategory = '',
    gender: existingGender = '',
    features: existingFeatures = [],
    sizes: existingSizes = [],
    images: existingImages = [],
}) => {
    const [name, setName] = useState<string>(existingName);
    const [description, setDescription] = useState<string>(existingDescription);
    const [price, setPrice] = useState<number>(existingPrice);
    const [category, setCategory] = useState<string>(existingCategory);
    const [gender, setGender] = useState<string>(existingGender);
    const [features, setFeatures] = useState<any[]>(existingFeatures);
    const [sizes, setSizes] = useState<string[]>(existingSizes);
    const [images, setImages] = useState<string[]>(existingImages);
    const router = useRouter();

    function createOrUpdateProduct() {
        if (_id) {
            axios.put('/api/product', { _id, name, description, price, category, gender, features, sizes, images });
        } else {
            axios.post('/api/product', { name, description, price, sizes, images });
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

    // Define ItemInterface to use with list and setList methods of ReactSortable
    interface ItemInterface {
        id: string;
        url: string;
    }

    // Map each image to an item of type ItemInterface
    const itemObjects = images.map((image, index) => ({
        id: index.toString(),
        url: image,
    })) as ItemInterface[];

    return (
        <>
            <PrimaryInput label="Name" placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            <PrimaryInput label="Category" placeholder="Category" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
            <PrimaryInput label="Gender" placeholder="Gender" value={gender} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)} />
            {features.map((feature, index) => (
                <PrimaryInput key={index} label={feature.name} placeholder="Feature" value={feature.value} />

            ))}
            <ReactSortable list={itemObjects} setList={(newItems) => setImages(newItems.map((item) => item.url))}>
                {!!itemObjects?.length && itemObjects.map(item => (
                    <div key={item.id} className="inline-block h-24 mr-2">
                        <img src={item.url} alt="" className="h-24"></img>
                    </div>
                ))}
            </ReactSortable>

            <PhotoInput text="Product Images" onChange={uploadImages} />
            <PriceInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes((prev) => { return [...prev, e.target.value] })} />
            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

export default ProductForm;