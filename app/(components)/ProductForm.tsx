"use client"

import { useEffect, useState } from "react";
import { Option, Feature, Size } from "../(types)";
import { useRouter } from "next/navigation";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import PhotoInput from "@/app/(components)/PhotoInput";
import PriceInput from "@/app/(components)/PriceInput";
import PrimaryButton from "@/app/(components)/PrimaryButton";
import PrimaryInput from "@/app/(components)/PrimaryInput";
import TextAreaInput from "@/app/(components)/TextAreaInput";
import Image from 'next/image';
import PrimarySelect from "./PrimarySelect";
import { Department } from "../(types)";
import { Category } from "../(types)";
import { Subcategory } from "../(types)";
import { Product } from "../(types)";


const ProductForm = (product?: Product) => {
    const [formProduct, setFormProduct] = useState<Product>({
        mongo_id: '',
        id: 0,
        sku: '',
        price: 0,
        wholesale_price: 0,
        available: false,
        brand: { id: 0, name: 'None' },
        name: '',
        description: '',
        features: undefined,
        department: { id: 0, name: 'None', categories: [] },
        category: { id: 0, name: 'None', subcategories: [] },
        subcategory: { id: 0, name: 'None' },
        images: [],
        sizes: [],
        status: 0,
        updated_at: undefined,
        created_at: undefined,
    })

    const [brands, setBrands] = useState<Option[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [department, setDepartment] = useState<Department>();
    const [category, setCategory] = useState<Category>();

    const router = useRouter();

    useEffect(() => {
        fetchBrands();
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (product) {
            setFormProduct(product);
        }
    }, [product]);

    async function fetchBrands() {
        const res = await axios.get('/api/brands');
        setBrands(res.data);
    }

    async function fetchDepartments() {
        const res = await axios.get('/api/department');
        setBrands(res.data);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    function createOrUpdateProduct() {
        // if (mongo_id) {
        //     axios.put('/api/product', {
        //         mongo_id,
        //         id,
        //         sku,
        //         brand_name: brand.name,
        //         name,
        //         description,
        //         price,
        //         wholesale_price,
        //         available: Boolean(available),
        //         department,
        //         category,
        //         subcategory,
        //         features,
        //         sizes,
        //         images,
        //         status
        //     });
        // } else {
        //     axios.post('/api/product', {
        //         id,
        //         sku,
        //         brand_name: brand.name,
        //         name,
        //         description,
        //         price,
        //         wholesale_price,
        //         available: Boolean(available),
        //         department,
        //         category,
        //         subcategory,
        //         features,
        //         sizes,
        //         images,
        //         status
        //     });
        //     router.push('/dashboard/');
    }

    // // Reads the file and sends it to the backend
    // async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    //     const files = e.target?.files;
    //     console.log("files are", files);

    //     const formData = new FormData();
    //     if (files && files?.length > 0) {
    //         for (let i = 0; i < files.length; i++) {
    //             const fileData = await readFile(files[i]);
    //             console.log("filesData is", fileData);

    //             if (fileData) {
    //                 formData.append('image', new Blob([fileData]), files[i].name);
    //             }
    //         }

    //         const res = await axios.post('/api/upload', formData);
    //         console.log("images are ", res.data);

    //         setImages(oldImages => [...oldImages, ...res.data]);
    //     }
    // }

    // // Reads File and returns an ArrayBuffer
    // const readFile = (file: File) => {
    //     return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             const fileData = reader.result;
    //             resolve(fileData);
    //         };

    //         reader.onerror = (error) => {
    //             reject(error);
    //         };

    //         reader.readAsArrayBuffer(file);
    //     });
    // };

    // // Define ItemInterface to use with list and setList methods of ReactSortable
    // interface ItemInterface {
    //     id: string;
    //     url: string;
    // }

    // // Map each image to an item of type ItemInterface
    // const itemObjects = Array.from(images).map((image, index) => ({
    //     id: index.toString(),
    //     url: image,
    // })) as ItemInterface[];


    return (
        <div className="px-16">
            {/* IMAGES */}
            {/* <div className="flex items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <PhotoInput text="Product Images" onChange={uploadImages} />
                <ReactSortable list={itemObjects} setList={(newItems) => setImages(newItems.map((item) => item.url))}>
                    {!!itemObjects?.length && itemObjects.map(item => (
                        <div key={item.id} className="inline-block mx-4">
                            <Image src={item.url} alt={item.id} width={217} height={290} />
                        </div>
                    ))}
                </ReactSortable>
            </div>
        </div> */}

            <div className="gap-8 mt-8">
                <div className="flex items-center gap-4">
                    {/* NAME */}
                    <PrimaryInput size='w-56' name="name" label="Name" placeholder="Name" value={formProduct.name} onChangeMethod={handleInputChange} />
                    {/* SKU */}
                    <PrimaryInput size='w-56' name="sku" label="SKU" placeholder="SKU" value={formProduct.sku} onChangeMethod={handleInputChange} />
                    {/* ID */}
                    <PrimaryInput size='w-32' name="id" label="Product ID" placeholder="ID" value={formProduct.id.toString()} onChangeMethod={handleInputChange} />
                </div>
                <div className="flex items-center mt-4">
                    <div>
                        <div className="flex items-center gap-4">
                            {/* DEPARTMENT */}
                            <PrimarySelect
                                value={departments.find(x => x.name === formProduct.department?.name) || { id: 0, name: 'None' }}
                                options={departments}
                                onValueChange={handleSelectChange}
                            />
                            {/* CATEGORY  */}
                            {department && <PrimarySelect
                                value={department?.categories.find(x => x.name === formProduct.category?.name) || { id: 0, name: 'None' }}
                                options={department.categories}
                                onValueChange={handleSelectChange}
                            />}
                            {/* SUBCATEGORY  */}
                            {category && <PrimarySelect
                                value={category?.subcategories.find(x => x.name === formProduct.subcategory?.name) || { id: 0, name: 'None' }}
                                options={category.subcategories}
                                onValueChange={handleSelectChange}
                            />}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            {/* BRAND */}
                            <PrimarySelect value={formProduct.brand} options={brands} onValueChange={handleSelectChange} />
                            {/* AVAILABILITY */}
                            <PrimarySelect
                                value={{ id: 0, name: 'true' }}
                                options={[{ id: 1, name: 'true' }, { id: 2, name: 'false' }]}
                                onValueChange={handleSelectChange}
                            />
                            {/* STATUS */}
                            <PrimarySelect
                                value={{ id: 0, name: 'Status: ' + status.toString() }}
                                options={[{ id: 1, name: '-1' }, { id: 2, name: '0' }, { id: 3, name: '1' }, { id: 4, name: '2' }]}
                                onValueChange={handleSelectChange}
                            />
                            {/* SIZES */}
                            {formProduct.sizes.length > 0 &&
                                <div>
                                    <span className="font-medium text-sm">
                                        Sizes:
                                    </span>
                                    {formProduct.sizes.map((size, index) => (
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
            < div className="flex items-center justify-between mt-2" >
                <TextAreaInput label="Description" value={formProduct.description} onChange={handleInputChange} />
            </div >

            {/* FEATURES */}
            {formProduct.features &&
                <div className="flex flex-wrap gap-4 text-sm mt-2" >
                    {Array.from(formProduct.features).map((feature, index) => (
                        <div key={index}>
                            <div className="font-medium mb-1">
                                {feature.name}
                            </div>
                            <div className="border border-gray-300 rounded-lg px-2 py-2 truncate...">
                                {feature.value}
                            </div>
                        </div>
                    ))}
                </div>
            }
            < div className="flex items-center gap-4 mt-2" >
                {/* PRICE */}
                <PriceInput name="Price" value={formProduct.price} onChange={handleInputChange} />
                {/* WHOLESALE PRICE */}
                <PriceInput name="Wholesale Price" value={formProduct.wholesale_price} onChange={handleInputChange} />
            </div>

            <div className="mt-2">
                {/* SAVE BUTTON */}
                <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
            </div>
        </div>
    )
}

export default ProductForm;