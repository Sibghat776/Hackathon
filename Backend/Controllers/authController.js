import Users from "../Models/Users.js";
import { createError, createSuccess } from "../utils/commonFunctions.js";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { sendEmail, generateOTP } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";

// -------------------
// REGISTER
// -------------------
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(createError(400, "All fields are required!"));
        }

        // Check if user already exists
        const existingUser = await Users.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser)
            return next(createError(409, "Username or Email already exists!"));

        if (password.length < 6)
            return next(createError(400, "Password must be at least 6 characters"));

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP and expiry
        const otp = generateOTP(); // e.g., 6-digit number
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        // Create new user
        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified: false,
        });

        await newUser.save();

        // Send OTP email
        await sendEmail(
            email,
            "Verify your email",
            `Hello ${username},\n\nYour OTP for verification is: ${otp}\nIt will expire in 10 minutes.\n\nRegards,\nSibghat Application`
        );

        const successRes = createSuccess(
            201,
            "User registered successfully. OTP has been sent to your email.",
            { id: newUser._id, username: newUser.username, email: newUser.email }
        );

        res.status(201).json(successRes);
    } catch (error) {
        next(error);
    }
};
// -------------------
// VERIFY OTP
// -------------------
export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await Users.findOne({ email }).select("+otp +otpExpiry");

        if (!user) return next(createError(404, "User not found!"));

        if (!user.otp || !user.otpExpiry || user.otp !== otp) {
            return next(createError(400, "Invalid OTP"));
        }

        if (user.otpExpiry < Date.now()) {
            return next(createError(400, "OTP has expired"));
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const successRes = createSuccess(200, "OTP verified successfully", {
            id: user._id,
            username: user.username,
            email: user.email,
        });
        res.status(200).json(successRes);
    } catch (error) {
        next(error);
    }
};

// -------------------
// LOGIN
// -------------------
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email }).select("+password");

        if (!user) return next(createError(404, "User not found"));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(createError(400, "Invalid credentials"));

        const token = jwt.sign(
            { id: user._id, isVerified: user.isVerified },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        const { password: _, otp, otpExpiry, ...userDetails } = user._doc;

        const successRes = createSuccess(200, "Login successful", userDetails);

        res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            })
            .status(200)
            .json(successRes);
    } catch (error) {
        next(error);
    }
};

// -------------------
// LOGOUT
// -------------------
export const logout = (req, res, next) => {
    try {
        res
            .clearCookie("access_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            .status(200)
            .json(createSuccess(200, "Logged out successfully"));
    } catch (error) {
        next(error);
    }
};

// -------------------
// GET SINGLE USER
// -------------------
export const getUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await Users.findOne({ username }).select("-password -otp -otpExpiry");

        if (!user) return next(createError(404, "User not found"));

        res.status(200).json(createSuccess(200, "User fetched successfully", user));
    } catch (error) {
        next(error);
    }
};

// -------------------
// GET ALL USERS
// -------------------
export const getUsers = async (req, res, next) => {
    try {
        const users = await Users.find().select("-password -otp -otpExpiry");
        res.status(200).json(createSuccess(200, "Users fetched successfully", users));
    } catch (error) {
        next(error);
    }
};

// -------------------
// UPDATE USER
// -------------------
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.path, "uploads/profilePic");
            updatedData.profilePic = result.secure_url;
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, {
            new: true,
            runValidators: true,
        }).select("-password -otp -otpExpiry");

        if (!updatedUser) return next(createError(404, "User not found"));

        res
            .status(200)
            .json(createSuccess(200, "User updated successfully", updatedUser));
    } catch (error) {
        next(error);
    }
};