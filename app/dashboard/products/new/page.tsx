"use client"

import { useState } from "react";
import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";
import axios from "axios";

export default function Page() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    function createProduct() {
        console.log(
            title, description, price
        );
        // axios.post("/api/product", {
        //     title, 
        //     description, 
        //     price
        // });
    }

    return (
        <div className='bg-white'>
            <div className="px-4">
                <div className='text-xl font-bold pb-2'>
                    New Product
                </div>
                <PrimaryInput label="Name" placeholder="Name" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                <TextAreaInput label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                <PhotoInput text="Product Photo" />
                <PriceInput value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
                <PrimaryButton text="Create" onClick={createProduct} />
            </div>
        </div>
    )
}