"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";
import { Product } from "../types";


const ProductForm = (props: Product) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState('');

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.description);
        setPrice(props.price);
        setSizes(props.sizes);
    }, [props.title, props.description, props.price, props.sizes]);

    function createOrUpdateProduct() {
        const _id = props._id;
        if(_id) {
            axios.put('/api/product', { _id, title, description, price, sizes });
        } else {
            axios.post('/api/product', { title, description, price, sizes });
        }
        
    }
    return (
        <>
            <PrimaryInput label="Name" placeholder="Name" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
            <PhotoInput text="Product Photo" />
            <PriceInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
            <PrimaryInput label="Sizes" placeholder="Sizes" value={sizes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSizes(e.target.value)} />
            <PrimaryButton text="Save" onClick={createOrUpdateProduct} />
        </>
    )
}

ProductForm.defaultProps = {
        _id: '',
        title: '',
        description: '',
        price: '',
        sizes: '',
}

export default ProductForm;