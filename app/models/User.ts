import { Schema, models, model } from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

export const User = models.User || model('User', UserSchema);