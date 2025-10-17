import Users from "../Models/Users.js"
import { createError, createSuccess } from "../utils/commonFunctions.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { generateOTP, sendEmail } from "../utils/sendEmail.js"
import { Otp } from "../Models/Otp.js"
import { create } from "domain"

export const register = async (req, res, next) => {
    try {
        // Check existing user
        if (!req.body) {
            return next(createError(400, "All fields are required!"));
        }
        const isExist = await Users.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });


        if (isExist) return next(createError(550, "Username OR Email already exist!"));

        if (req.body.password.length < 6) {
            return next(createError(400, "Password should contain minimum 6 letters!"));
        }

        // Upload profile picture if available
        let profilePicUrl;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path, "uploads/profilePic");
            profilePicUrl = result.secure_url;
        }

        if (!profilePicUrl) {
            return next(createError(400, "Profile picture is required!"));
        }
        // Create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profilePic: profilePicUrl,
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        const otp = generateOTP();
        await Otp.create({
            email: req.body.email,
            otp: otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
        });
        await newUser.save();
        sendEmail(req.body.email, "Thanks for Signing up!", `Welcome to My App\n Hello ${newUser.firstName},\n\nThank you for registering with Sibghat Application! \\n\nYour OTP for verification is: ${otp}\n\nBest regards,\nSibghat Ullah`);
        const successResponse = createSuccess(200, "OTP has been sent to your email. Please verify your account.");
        res.status(200).json({
            ...successResponse,
            data: newUser
        });

    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email, otp, "email and otp in verifyOtp");
    try {
        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        
        const updateUser = await Users.updateOne({ email: email }, { $set: { isVerified: true } })
        const successResponse = createSuccess(200, "OTP verified successfully", updateUser);
        res.json({
            ...successResponse
        });
        // await Otp.deleteMany({ email }); // delete all OTPs for this email
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await Users.findOne({ email: email })

        if (user.length === 0) {
            return res.status(404).json(createError(404, "User not found!"))
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json(createError(400, "Wrong Credentials!"))
        }

        let { password: _, ...userDetails } = user._doc


        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT, { expiresIn: "3d" }
        )

        let successResponse = createSuccess(200, "User Logged In Successfully")
        res.
            cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({
                ...successResponse,
                data: userDetails
            })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        }).status(200).json(createSuccess(200, "User Logged Out Successfully"));

    } catch (error) {
        next(error);
    }
}
export const getUser = async (req, res, next) => {
    try {
        const username = req.params.username;

        console.log(username, "username");

        const user = await Users.findOne({ username });

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const { password, ...userDetails } = user._doc;

        const successRes = createSuccess(200, "User fetched successfully");
        res.status(200).json({
            ...successRes,
            data: userDetails
        });

    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await Users.find();
        const successRes = createSuccess(200, "Users fetched successfully");
        res.status(200).json({
            ...successRes,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.path, "uploads/profilePic");
            updatedData.profilePic = result.secure_url;
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return next(createError(404, "User not found!"));
        }

        const successRes = createSuccess(200, "User updated successfully");
        res.status(200).json({
            ...successRes,
            data: updatedUser
        });

    } catch (error) {
        next(error);
    }
}