import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    sizes: String,
});

export const Product = models.Product || model('Product', ProductSchema);