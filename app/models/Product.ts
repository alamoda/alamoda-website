import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
        id: { type: Number, required: true, unique: true, dropDups: true },
        sku: { type: String, required: true, unique: true, dropDups: true },
        price: { type: Number, required: true },
        wholesale_price: { type: Number, required: true },
        available: {type: Boolean, required: true },
        name: { type: String, required: true },
        description: String,
        features: [{type: Object}],
        gender: { type: String, required: true },
        category: { type: String, required: true },
        images: [{type: String}],
        sizes: [{type: Object}],
        status: { type: Number, required: true },
        updated_at: Number,
        created_at: Number,
});

export const Product = models.Product || model('Product', ProductSchema);