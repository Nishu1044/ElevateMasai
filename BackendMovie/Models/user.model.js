import {Schema, model} from 'mongoose';
const userSchema=new Schema({
        name: String,
        email: {
        type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
        }, {
            timestamps: true
})

const User=model("User",userSchema)
export {User}