import mongoose from "mongoose";

export const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
        default: Date.now,
        expires: '5m' // OTP will expire after 5 minutes
    }
}, { timestamps: true });
export const Otp = mongoose.model("Otp", otpSchema);