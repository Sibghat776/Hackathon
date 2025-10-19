// Current Multer configuration (using memoryStorage)
import multer from "multer";
// ... other imports and filters

const storage = multer.memoryStorage(); // <-- Keeps file in memory (as a buffer)

// ...
const upload = multer({
    storage,
    // ... limits and fileFilter
});

export default upload;