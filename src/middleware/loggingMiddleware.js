"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const filePath = path_1.default.join(__dirname, "../logs/api.log");
if (!fs_1.default.existsSync(path_1.default.dirname(filePath))) {
    fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
}
const logRequest = (req, res, next) => {
    var _a;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined. Check your environment variables.");
    }
    const timestamp = new Date().toISOString();
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        const message = "Access denied. Token is required!";
        logToFile(`[${timestamp}] ${req.method} ${req.url} - 401 Unauthorized - ${message}`);
        return res.status(401).json({ message });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        const logEntry = `[${timestamp}] ${req.method} ${req.url} - User: ${decoded.userId} - Authenticated ✅`;
        logToFile(logEntry);
        res.on("finish", () => {
            const responseLog = `[${timestamp}] ${req.method} ${req.url} - ${res.statusCode}`;
            logToFile(responseLog);
        });
        next();
    }
    catch (err) {
        const message = "Invalid or expired token 🚫";
        logToFile(`[${timestamp}] ${req.method} ${req.url} - 401 Unauthorized - ${message}`);
        return res.status(401).json({ message });
    }
};
const logToFile = (message) => {
    fs_1.default.appendFile(filePath, message + "\n", (err) => {
        if (err)
            console.error("Error writing to log file:", err);
    });
};
exports.default = logRequest;
