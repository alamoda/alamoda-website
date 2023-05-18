import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = models.User || model('User', UserSchema);