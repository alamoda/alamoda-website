import mongoose from "mongoose";

export function mongooseConnect() {
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const uri = 'mongodb+srv://simozampa:<3NcsmN6RovpaLRnKpassword>@cluster0.rdkre1n.mongodb.net/?retryWrites=true&w=majority';
        return mongoose.connect(uri);
    }
}