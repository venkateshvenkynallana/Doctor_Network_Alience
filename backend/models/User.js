import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    number: {
        type: String,
        required: true,
        unique: true
    },

    //otp for reset password
    resetOtp: Number,
    
    otpExpire: Date,

}, {timestamps: true})

const user = mongoose.model("User", userSchema);

export default user;