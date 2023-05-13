"use client"

import { useState } from "react";
import { Product } from "../types";
import axios from "axios";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";


const ProductForm = (props: {product: Product}) => {
    const [title, setTitle] = useState(props.product?.title || '');
    const [description, setDescription] = useState(props.product?.description || '');
    const [price, setPrice] = useState(props.product?.price || '');
    const [sizes, setSizes] = useState(props.product?.sizes || '');

    function createProduct() {
        axios.post("/api/product", {
            title,
            description,
            price,
            sizes
        });
    }
    return (
        <>
            <PrimaryInput label="Name" placeholder="Name" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            <PhotoInput text="Product Photo" />
            <PriceInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes(e.target.value)} />
            <PrimaryButton text="Create" onClick={createProduct} />
        </>
    )
}

export default ProductForm;