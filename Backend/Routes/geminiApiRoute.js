import express from "express";
import multer from "multer";
import { analyzeReport } from "../Controllers/geminiApiController.js";
import upload from "../middlewares/upload.js";

const apiRouter = express.Router();

apiRouter.post("/analyze", upload.single("file"), analyzeReport);

export default apiRouter;
