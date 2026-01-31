import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
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
    phoneNo: {
        type: String,
        required: true,

    },
    designation: {
        type: String,
        default: ""
    },

    profile: {
        professionalHeadline: {
            type: String,
            default: ""
        },
        skills: {
            type: [String],
            default: []
        },
        experience: {
            jobTitle: { type: String, default: "" },
            hospital: { type: String, default: "" },
            duration: { type: String, default: "" },
            description: { type: String, default: "" }
        },

        education: {
            degree: { type: String, default: "" },
            university: { type: String, default: "" },
            year: { type: String, default: "" }
        },

        certifications: {
            name: { type: String, default: "" },
            issuingOrganization: { type: String, default: "" },
            validUntil: { type: String, default: "" }
        }
    },
    //otp for reset password
    resetOtp: Number,

    otpExpire: Date,

}, { timestamps: true })

const user = mongoose.model("User", userSchema);

export default user;