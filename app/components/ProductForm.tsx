"use client"

import { useEffect, useState } from "react";
import { Product, Option, Feature } from "../types";
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
import { CATEGORIES, DEPARTMENTS, SUBCATEGORIES } from "../utils/constants";


const ProductForm = ({
    mongo_id = '',
    id: existingId = 0,
    sku: existingSku = '',
    brand: existingBrand = { id: 0, name: 'not selected' },
    name: existingName = '',
    description: existingDescription = '',
    price: existingPrice = 0,
    wholesale_price: existingWholesaleprice = 0,
    available: existingAvailable = true,
    category: existingCategory = '',
    subcategory: existingSubcategory = '',
    department: existingDepartment = '',
    features: existingFeatures = [],
    sizes: existingSizes = [],
    images: existingImages = [],
    status: existingStatus = 0,
}) => {
    const [id, setId] = useState<number>(existingId);
    const [sku, setSku] = useState<string>(existingSku);
    const [name, setName] = useState<string>(existingName);
    const [brand, setBrand] = useState<Option>(existingBrand);
    const [description, setDescription] = useState<string>(existingDescription);
    const [price, setPrice] = useState<number>(existingPrice);
    const [wholesale_price, setWholesaleprice] = useState<number>(existingWholesaleprice);
    const [available, setAvailable] = useState<Boolean>(existingAvailable);
    const [category, setCategory] = useState<string>(existingCategory);
    const [subcategory, setSubcategory] = useState<string>(existingSubcategory);
    const [department, setDepartment] = useState<string>(existingDepartment);
    const [features, setFeatures] = useState<Feature[]>(existingFeatures);
    const [sizes, setSizes] = useState<string[]>(existingSizes);
    const [images, setImages] = useState<string[]>(existingImages);
    const [status, setStatus] = useState<Number>(existingStatus);
    const [brands, setBrands] = useState<Option[]>([]);

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
            axios.put('/api/product', {
                mongo_id,
                id,
                sku,
                brand_name: brand.name,
                name,
                description,
                price,
                wholesale_price,
                available,
                department,
                category,
                subcategory,
                features,
                sizes,
                images,
                status
            });
        } else {
            axios.post('/api/product', {
                id,
                sku,
                brand_name: brand.name,
                name,
                description,
                price,
                wholesale_price,
                available,
                department,
                category,
                subcategory,
                features, 
                sizes,
                images,
                status
            });
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

            <div className="flex items-center gap-4">
                {/* SKU */}
                <PrimaryInput size='w-56' label="SKU" placeholder="SKU" value={sku} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)} />
                {/* ID */}
                <PrimaryInput size='w-32' label="Product ID" placeholder="ID" value={id.toString()} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))} />
            </div>

            <div className="flex items-center gap-4">
                {/* NAME */}
                <PrimaryInput size='w-56' label="Name" placeholder="Name" value={name} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                {/* BRAND */}
                <PrimarySelect value={brand} options={brands} label="Brand" onValueChange={(value: Option) => setBrand(value)} />
            </div>

            {/* DESCRIPTION */}
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />

            <div className="flex items-center gap-4">
                {/* DEPARTMENT */}
                <PrimarySelect
                    label="Department"
                    value={DEPARTMENTS.find(x => x.name === department) || {id: 0, name: 'not selected'}}
                    options={DEPARTMENTS}
                    onValueChange={(value: Option) => setDepartment(value.name)}
                />
                {/* CATEGORY  */}
                <PrimarySelect
                    label="Category"
                    value={CATEGORIES.find(x => x.name === category) || {id: 0, name: 'not selected'}}
                    options={CATEGORIES}
                    onValueChange={(value: Option) => setCategory(value.name)}
                />
                {/* SUBCATEGORY  */}
                <PrimarySelect
                    label="Subcategory"
                    value={SUBCATEGORIES.find(x => x.name === subcategory) || {id: 0, name: 'not selected'}}
                    options={SUBCATEGORIES}
                    onValueChange={(value: Option) => setSubcategory(value.name)}
                />
            </div>
            <div className="flex flex-wrap gap-4">
                {/* FEATURES */}
                {Array.from(features).map((feature, index) => (
                    <PrimaryInput size='w-32' key={index} label={feature.name} placeholder="Feature" value={feature.value} />
                ))}
            </div>

            {/* PRICE AND WHOLESALE PRICE */}
            <div className="flex items-center gap-4">
                <PriceInput name="Price" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                <PriceInput name="Wholesale Price" value={wholesale_price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWholesaleprice(Number(e.target.value))} />
            </div>

            {/* SIZES */}
            {sizes.map((size, index) => (
                // <PrimaryInput key={index} label="Sizes" placeholder="Sizes" value={size} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setSizes((prev) => { return [...prev, e.target.value] })} />
                <div key={index}>
                    size
                </div>
            ))}

            <div className="flex items-center gap-4 mb-4">
                {/* AVAILABILITY */}
                <PrimarySelect
                    label="Available"
                    value={{ id: 0, name: available.toString() }}
                    options={[{ id: 1, name: 'true' }, { id: 2, name: 'false' }]}
                    onValueChange={(value: Option) => setAvailable(Boolean(value))}
                />
                {/* STATUS */}
                <PrimarySelect
                    label="Status"
                    value={{ id: 0, name: status.toString() }}
                    options={[{ id: 1, name: '-1' }, { id: 2, name: '0' }, { id: 3, name: '1' }, { id: 4, name: '2' }]}
                    onValueChange={(value: Option) => setStatus(Number(value))}
                />
            </div>

            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

export default ProductForm;