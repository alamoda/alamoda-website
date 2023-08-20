"use client"

import { useEffect, useState } from "react";
import { Option, Feature, Size, Subcategory, Department, Category, Brand } from "../(types)";
import { useRouter } from "next/navigation";
import { ReactSortable } from "react-sortablejs";
import PhotoInput from "@/app/(components)/PhotoInput";
import PriceInput from "@/app/(components)/PriceInput";
import PrimaryButton from "@/app/(components)/PrimaryButton";
import PrimaryInput from "@/app/(components)/PrimaryInput";
import TextAreaInput from "@/app/(components)/TextAreaInput";
import Image from 'next/image';
import PrimarySelect from "./PrimarySelect";

const ProductForm = ({
    mongo_id = '',
    id: existingId = 0,
    sku: existingSku = '',
    brand: existingBrand = null,
    name: existingName = '',
    description: existingDescription = '',
    price: existingPrice = 0,
    wholesale_price: existingWholesaleprice = 0,
    available: existingAvailable = true,
    department: existingDepartment = null,
    category: existingCategory = null,
    subcategory: existingSubcategory = null,
    features: existingFeatures = [],
    sizes: existingSizes = [],
    images: existingImages = [],
    status: existingStatus = 0,
}) => {
    const [id, setId] = useState<number>(existingId);
    const [sku, setSku] = useState<string>(existingSku);
    const [name, setName] = useState<string>(existingName);
    const [brand, setBrand] = useState<Brand | null>(existingBrand);
    const [description, setDescription] = useState<string>(existingDescription);
    const [price, setPrice] = useState<number>(existingPrice);
    const [wholesale_price, setWholesaleprice] = useState<number>(existingWholesaleprice);
    const [available, setAvailable] = useState<boolean>(existingAvailable);
    const [department, setDepartment] = useState<Department | null>(existingDepartment);
    const [category, setCategory] = useState<Category | null>(existingCategory);
    const [subcategory, setSubcategory] = useState<Subcategory | null>(existingSubcategory);
    const [features, setFeatures] = useState<Feature[]>(existingFeatures);
    const [sizes, setSizes] = useState<Size[]>(existingSizes);
    const [images, setImages] = useState<string[]>(existingImages);
    const [status, setStatus] = useState<number>(existingStatus);

    const [brands, setBrands] = useState<Option[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);

    const router = useRouter();

    useEffect(() => {
        fetchBrands();
        fetchDepartments();
    }, []);

    async function fetchBrands() {
        const response = await fetch('/api/brands', {
            method: 'GET'
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        setBrands(data);
    }

    async function fetchDepartments() {
        const response = await fetch('/api/departments', {
            method: 'GET'
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        setDepartments(data);
    }

    async function createOrUpdateProduct() {
        if (mongo_id) {
            const response = await fetch('/api/product', {
                method: 'PUT',
                body: JSON.stringify({
                    mongo_id,
                    id,
                    sku,
                    brand_id: brand?.mongo_id,
                    name,
                    description,
                    price,
                    wholesale_price,
                    available: Boolean(available),
                    department_id: department?.mongo_id,
                    category_id: category?.mongo_id,
                    subcategory: subcategory?.mongo_id,
                    features,
                    sizes,
                    images,
                    status
                })
            });

            if (!response.ok) {
                console.error("Could not update product!")
                return;
            }
        } else {
            const response = await fetch('/api/product', {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    sku,
                    brand_id: brand?.mongo_id,
                    name,
                    description,
                    price,
                    wholesale_price,
                    available: Boolean(available),
                    department_id: department?.mongo_id,
                    category_id: category?.mongo_id,
                    subcategory_id: subcategory?.mongo_id,
                    features,
                    sizes,
                    images,
                    status
                })
            });

            if (!response.ok) {
                console.error("Could not create product!")
                return;
            }

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

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData

            }) 

            if (!response.ok){
                console.error("Error while uploading the images!");
                return;
            }

            const data = await response.json();
            console.log("images are ", data);

            setImages(oldImages => [...oldImages, ...data]);
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
            <div className="flex items-center mt-16">
                <div className="flex flex-wrap items-center">
                    <ReactSortable list={itemObjects} setList={(newItems) => setImages(newItems.map((item) => item.url))}>
                        {!!itemObjects?.length && itemObjects.map(item => (
                            <div key={item.id} className="relative inline-block mx-4">
                                <button
                                    className="absolute top-0 right-0 text-red-700"
                                    onClick={() => setImages(images.filter(x => x !== item.url))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <Image src={item.url} alt={item.id} width={217} height={290} />
                            </div>
                        ))}
                    </ReactSortable>
                    <PhotoInput onChange={uploadImages} />
                </div>
            </div>

            <div className="flex items-center gap-6 mt-4">
                {/* NAME */}
                <PrimaryInput
                    width='w-56'
                    label="Name"
                    placeholder="Name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                {/* SKU */}
                <PrimaryInput
                    width='w-56'
                    label="SKU"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)}
                />
                {/* ID */}
                <PrimaryInput
                    width='w-56'
                    label="Product ID"
                    placeholder="ID"
                    value={id.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(Number(e.target.value))}
                />
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-4">
                {/* DEPARTMENT */}
                <PrimarySelect
                    label="Department"
                    value={department}
                    options={departments}
                    onValueChange={(value: Department) => {
                        setDepartment(value);
                        setCategory(null);
                        setSubcategory(null);
                    }}
                />
                {/* CATEGORY  */}
                <PrimarySelect
                    label="Category"
                    value={category || null}
                    options={department?.categories || null}
                    onValueChange={(value: Category) => {
                        setCategory(value);
                        setSubcategory(null);
                    }}
                />
                {/* SUBCATEGORY  */}
                <PrimarySelect
                    label="Subcategory"
                    value={subcategory || null}
                    options={category?.subcategories || null}
                    onValueChange={(value: Subcategory) => setSubcategory(value)}
                />
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-4">
                {/* BRAND */}
                <PrimarySelect
                    label="Brand"
                    value={brand!}
                    options={brands}
                    onValueChange={(value: Brand) => setBrand(value)}
                />
                {/* AVAILABILITY */}
                <PrimarySelect
                    label="Available"
                    value={{ mongo_id: '-1', name: available.toString() }}
                    options={[{ mongo_id: '0', name: 'true' }, { mongo_id: '1', name: 'false' }]}
                    onValueChange={(value: Option) => setAvailable(value.name === 'false' ? false : true)}
                />
                {/* STATUS */}
                <PrimarySelect
                    label="Status"
                    value={{ mongo_id: '-1', name: status.toString() }}
                    options={[{ mongo_id: '0', name: '-1' }, { mongo_id: '1', name: '0' }, { mongo_id: '2', name: '1' }, { mongo_id: '3', name: '2' }]}
                    onValueChange={(value: Option) => setStatus(Number(value.name))}
                />

            </div>

            {/* SIZES */}
            {sizes.length > 0 &&
                <div className="mt-4">
                    <div className="font-medium text-sm">
                        Sizes:
                    </div>
                    <div className="mt-2">
                        {sizes.map((size, index) => (
                            <span key={index} className="text-sm">
                                {" " + size.name}
                            </span>
                        ))
                        }
                    </div>
                </div>
            }

            {/* DESCRIPTION */}
            < div className="flex items-center justify-between mt-4" >
                <TextAreaInput
                    label="Description"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                />
            </div >

            {/* FEATURES */}
            {Array.from(features).length > 0 &&
                <div className="flex flex-wrap gap-6 text-sm mt-4" >
                    {Array.from(features).map((feature, index) => (
                        <div key={index}>
                            <div className="font-medium mb-1">
                                {feature.name}
                            </div>
                            <div className="border border-gray-300 px-2 py-2 truncate...">
                                {feature.value}
                            </div>
                        </div>
                    ))}
                </div>
            }

            <div className="my-4 flex items-center gap-6">
                {/* PRICE */}
                <PriceInput
                    label="Price"
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                />
                {/* WHOLESALE PRICE */}
                <PriceInput
                    label="Wholesale Price"
                    value={wholesale_price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWholesaleprice(Number(e.target.value))}
                />
            </div>

            <span>
                {/* SAVE BUTTON */}
                <PrimaryButton
                    text="Save"
                    onClick={() => createOrUpdateProduct()}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                />
            </span>
        </>
    )
}

export default ProductForm;