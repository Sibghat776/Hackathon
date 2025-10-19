// controllers/geminiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createError, createSuccess } from "../utils/commonFunctions.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

// Helper: Convert file buffer to Gemini Part
function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType,
        },
    };
}

// ----------------------
// ANALYZE REPORT (Text or File)
// ----------------------
export const analyzeReport = async (req, res, next) => {
    try {
        const { text } = req.body;
        const file = req.file;

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return next(createError(500, "Server configuration error: Gemini API Key not found."));
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


        // 🧠 System Instruction
        const systemInstruction = `
      Aap ek mahir aur madadgar AI health assistant hain. Aapka kaam medical report ya user ke likhe text ka analysis karna, 
      ahem nateejon ko summarize karna, aur aam maloomati hal (solutions) ya agle iqdamaat (next steps) batana hai.
      
      ⚠️ **Disclaimer:** Main ek AI tool hoon aur meri analysis kisi qualified doctor ki salah ka mutabadil nahi hai.
      Barah-e-mehrbani apne nateeje kisi doctor se confirm karein.
    `;

        // --- Input Validation ---
        if (!text && !file) {
            return next(createError(400, "Barah-e-mehrbani, analysis ke liye text ya report ki tasveer faraham karein."));
        }

        let parts = [];

        if (file) {
            // Upload to Cloudinary
            const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const uploadResult = await uploadToCloudinary(fileBase64, "health-reports");

            // Add image + optional text to Gemini parts
            parts.push(fileToGenerativePart(file.buffer, file.mimetype));

            const reportPrompt = text
                ? `Is medical report ko achhi tarah analyze karein aur user ke sawal ka jawab dein: "${text}".`
                : "Is report mein likhi hui findings ka summary aur possible explanation dein.";

            parts.push({ text: reportPrompt });

            // Add to contents
            var contents = [{ role: "user", parts }];

            // Generate response
            const result = await model.generateContent({
                systemInstruction,
                contents,
                generationConfig: { temperature: 0.4 },
            });

            const summary = result.response.text() || "Analysis ke liye koi jawab hasil nahi hua.";

            return res.status(200).json(
                createSuccess(200, "Report analyzed successfully", {
                    analysis: summary,
                    imageUrl: uploadResult.secure_url,
                })
            );
        }

        // Only Text Case
        const prompt = `User ki taraf se di gayi ma'alumaat: "${text}". Is beemari ya condition ka hal aur agle zaroori iqdamaat bataiye.`;

        const result = await model.generateContent({
            systemInstruction,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.4 },
        });

        const summary = result.response.text() || "Analysis ke liye koi jawab hasil nahi hua.";

        res.status(200).json(
            createSuccess(200, "Text analyzed successfully", {
                analysis: summary,
            })
        );
    } catch (error) {
        console.error("❌ Gemini API Processing Error:", error.message);
        next(createError(500, "Gemini se analysis mein nakami. Barahe-meherbani dobara koshish karein."));
    }
};
