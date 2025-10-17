import e from "express";
import { getUser, getUsers, login, logout, register, updateUser, verifyOtp } from "../Controllers/authController.js";
import upload from "../middlewares/upload.js";

export let authRoute = e.Router();

authRoute.post("/register", upload.single("profilePic"), register);
authRoute.post("/verifyOtp", verifyOtp);
authRoute.post("/login", login);
authRoute.post("/updateUser/:id", updateUser)

authRoute.get("/logout", logout);
authRoute.get("/getUser/:username", getUser);
authRoute.get("/getUsers", getUsers);