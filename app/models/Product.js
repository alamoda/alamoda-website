import { Schema, models } from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    sizes: String,
});

export const Products = models.Product || models('Product', ProductSchema);