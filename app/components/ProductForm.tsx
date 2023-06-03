"use client"

import { useEffect, useState } from "react";
import { Product, Option, Feature, Size } from "../types";
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
    brand: existingBrand = { id: 0, name: 'Brand' },
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
    const [available, setAvailable] = useState<boolean>(existingAvailable);
    const [category, setCategory] = useState<string>(existingCategory);
    const [subcategory, setSubcategory] = useState<string>(existingSubcategory);
    const [department, setDepartment] = useState<string>(existingDepartment);
    const [features, setFeatures] = useState<Feature[]>(existingFeatures);
    const [sizes, setSizes] = useState<Size[]>(existingSizes);
    const [images, setImages] = useState<string[]>(existingImages);
    const [status, setStatus] = useState<number>(existingStatus);
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
                available: Boolean(available),
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
                available: Boolean(available),
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
        <div className="px-16">
            {/* IMAGES */}
            <div className="flex items-center gap-4">
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

            </div>

            <div className="gap-8 mt-8">
                <div className="flex items-center gap-4">
                    {/* NAME */}
                    <PrimaryInput size='w-56' label="Name" placeholder="Name" value={name} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    {/* SKU */}
                    <PrimaryInput size='w-56' label="SKU" placeholder="SKU" value={sku} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)} />
                    {/* ID */}
                    <PrimaryInput size='w-32' label="Product ID" placeholder="ID" value={id.toString()} onChangeMethod={(e: React.ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))} />
                </div>
                <div className="flex items-center mt-4">
                    <div>
                        <div className="flex items-center justify-center gap-4">
                            {/* DEPARTMENT */}
                            <PrimarySelect
                                value={DEPARTMENTS.find(x => x.name === department) || { id: 0, name: 'Department' }}
                                options={DEPARTMENTS}
                                onValueChange={(value: Option) => setDepartment(value.name)}
                            />
                            {/* CATEGORY  */}
                            <PrimarySelect
                                value={CATEGORIES.find(x => x.name === category) || { id: 0, name: 'Category' }}
                                options={CATEGORIES}
                                onValueChange={(value: Option) => setCategory(value.name)}
                            />
                            {/* SUBCATEGORY  */}
                            <PrimarySelect
                                value={SUBCATEGORIES.find(x => x.name === subcategory) || { id: 0, name: 'Subcategory' }}
                                options={SUBCATEGORIES}
                                onValueChange={(value: Option) => setSubcategory(value.name)}
                            />

                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            {/* BRAND */}
                            <PrimarySelect value={brand} options={brands} onValueChange={(value: Option) => setBrand(value)} />
                            {/* AVAILABILITY */}
                            <PrimarySelect
                                value={{ id: 0, name: 'Available: ' + available.toString() }}
                                options={[{ id: 1, name: 'true' }, { id: 2, name: 'false' }]}
                                onValueChange={(value: Option) => setAvailable(Boolean(value.name))}
                            />
                            {/* STATUS */}
                            <PrimarySelect
                                value={{ id: 0, name: 'Status: ' + status.toString() }}
                                options={[{ id: 1, name: '-1' }, { id: 2, name: '0' }, { id: 3, name: '1' }, { id: 4, name: '2' }]}
                                onValueChange={(value: Option) => setStatus(Number(value.name))}
                            />
                            {/* SIZES */}
                            {sizes.length > 0 &&
                                <div>
                                    <span className="font-medium text-sm">
                                        Sizes:
                                    </span>
                                    {sizes.map((size, index) => (
                                        <span key={index} className="text-sm">
                                            {" " + size.name}
                                        </span>
                                    ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION */}
            < div className="flex items-center justify-between mt-4" >
                <div>
                    <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                </div>
                <div>
                    {/* FEATURES */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm" >
                        {Array.from(features).map((feature, index) => (
                            <div key={index}>
                                <div className="font-medium mb-3">
                                    {feature.name}
                                </div>
                                <div className="border border-gray-300 rounded-lg px-2 py-2 truncate...">
                                    {feature.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >

            < div className="flex items-center gap-4" >
                {/* PRICE */}
                <PriceInput name="Price" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                {/* WHOLESALE PRICE */}
                <PriceInput name="Wholesale Price" value={wholesale_price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWholesaleprice(Number(e.target.value))} />
            </div>

            <div className="mt-2">
                {/* SAVE BUTTON */}
                <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
            </div>
        </div>
    )
}

export default ProductForm;