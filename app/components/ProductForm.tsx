"use client"

import { useState } from "react";
import { Brand, Product } from "../types";
import { useRouter } from "next/navigation";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";


const ProductForm = ({
    mongo_id = '',
    id: existingId = 0,
    sku: existingSku = '',
    brand: existingBrand = {id: 0, name: ''},
    name: existingName = '',
    description: existingDescription = '',
    price: existingPrice = 0,
    wholesaleprice: existingWholesaleprice = 0,
    available: existingAvailable = true,
    category: existingCategory = '',
    gender: existingGender = '',
    features: existingFeatures = [],
    sizes: existingSizes = [],
    images: existingImages = [],
    status: existingStatus = 0,
}) => {
    const [id, setId] = useState<number>(existingId);
    const [sku, setSku] = useState<string>(existingSku);
    const [name, setName] = useState<string>(existingName);
    const [brand, setBrand] = useState<Brand>(existingBrand);
    const [description, setDescription] = useState<string>(existingDescription);
    const [price, setPrice] = useState<number>(existingPrice);
    const [wholesale_price, setWholesaleprice] = useState<number>(existingWholesaleprice);
    const [available, setAvailable] = useState<boolean>(existingAvailable);
    const [category, setCategory] = useState<string>(existingCategory);
    const [gender, setGender] = useState<string>(existingGender);
    const [features, setFeatures] = useState<any[]>(existingFeatures);
    const [sizes, setSizes] = useState<string[]>(existingSizes);
    const [images, setImages] = useState<string[]>(existingImages);
    const [status, setStatus] = useState<number>(existingStatus);
    const router = useRouter();

    function createOrUpdateProduct() {
        if (mongo_id) {
            axios.put('/api/product', { mongo_id, id, sku, brand_name: brand.name, name, description, price, wholesale_price, available, category, gender, features, sizes, images, status });
        } else {
            axios.post('/api/product', { id, sku, brand_name: brand.name, name, description, price, wholesale_price, available, category, gender, features, sizes, images, status });
            router.push('/dashboard/');
        }
    }

    // Reads the file and sends it to the backend
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
    const itemObjects = Array.from(images).map((image, index) => ({
        id: index.toString(),
        url: image,
    })) as ItemInterface[];

    return (
        <>
            <div className="flex items-center gap-4">
                <PrimaryInput label="Product ID" placeholder="ID" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))} />
                <PrimaryInput label="SKU" placeholder="SKU" value={sku} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
                <PrimaryInput label="Name" placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <PrimaryInput label="Brand" placeholder="Brand" value={brand.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrand({id: brand.id, name: e.target.value})} />        
            </div>
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            <div className="flex items-center gap-4">
                <PrimaryInput label="Category" placeholder="Category" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
                <PrimaryInput label="Gender" placeholder="Gender" value={gender} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)} />
            </div>
            {Array.from(features).map((feature, index) => (
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
            <div className="flex items-center gap-4">
                <PriceInput name="Price" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                <PriceInput name="Wholesale Price" value={wholesale_price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWholesaleprice(Number(e.target.value))} />
            </div>
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes((prev) => { return [...prev, e.target.value] })} />
            <PrimaryInput label="Available" placeholder="Available" value={available} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvailable(Boolean(e.target.value))} />
            <PrimaryInput label="Status" placeholder="Status" value={status} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(Number(e.target.value))} />
            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

export default ProductForm;