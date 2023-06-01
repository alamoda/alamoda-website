"use client"

import { useEffect, useState } from "react";
import { Brand, Product } from "../types";
import { useRouter } from "next/navigation";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";
import Image from 'next/image';
import PrimarySelect from "./PrimarySelect";

const ProductForm = ({
    mongo_id = '',
    id: existingId = 0,
    sku: existingSku = '',
    brand: existingBrand = { id: 0, name: '' },
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
    const [brands, setBrands] = useState<Brand[]>([]);

    const router = useRouter();

    useEffect(() => {
        fetchBrands();
    }, []);

    async function fetchBrands() {
        const res = await axios.get('/api/brands');
        console.log("brands are", res.data);
        setBrands(res.data);
    }

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
            {/* IMAGES */}
            <div className="flex items-center">
                <ReactSortable list={itemObjects} setList={(newItems) => setImages(newItems.map((item) => item.url))}>
                    {!!itemObjects?.length && itemObjects.map(item => (
                        <div key={item.id} className="inline-block mx-4">
                            <Image src={item.url} alt={item.id} width={200} height={200} />
                        </div>
                    ))}
                </ReactSortable>
                <PhotoInput text="Product Images" onChange={uploadImages} />
            </div>

            {/* ID AND SKU */}
            <div className="flex items-center gap-4">
                <PrimaryInput label="Product ID" placeholder="ID" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))} />
                <PrimaryInput label="SKU" placeholder="SKU" value={sku} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)} />
            </div>

            {/* NAME AND BRAND */}
            <div className="flex items-center gap-4">
                <PrimaryInput label="Name" placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <PrimarySelect value={brand} options={brands} label="Brand" />
                {/* <PrimaryInput label="Brand" placeholder="Brand" value={brand.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrand({ id: brand.id, name: e.target.value })} /> */}
            </div>

            {/* DESCRIPTION */}
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />

            {/* DEPARTMENT, CATEGORY, AND SUBCATEGORY */}
            <div className="flex items-center gap-4">
                <PrimaryInput label="Category" placeholder="Category" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
                <PrimaryInput label="Gender" placeholder="Gender" value={gender} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)} />
            </div>

            {/* FEATURES */}
            {Array.from(features).map((feature, index) => (
                <PrimaryInput key={index} label={feature.name} placeholder="Feature" value={feature.value} />
            ))}

            {/* PRICE AND WHOLESALE PRICE */}
            <div className="flex items-center gap-4">
                <PriceInput name="Price" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                <PriceInput name="Wholesale Price" value={wholesale_price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWholesaleprice(Number(e.target.value))} />
            </div>

            {/* SIZES */}
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes((prev) => { return [...prev, e.target.value] })} />
            
            {/* AVAILABILITY */}
            <PrimaryInput label="Available" placeholder="Available" value={available} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvailable(Boolean(e.target.value))} />
            
            {/* STATUS */}
            <PrimaryInput label="Status" placeholder="Status" value={status} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(Number(e.target.value))} />
            
            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

export default ProductForm;