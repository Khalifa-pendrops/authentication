"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedRequest = void 0;
const isAuthenticatedRequest = (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized 🚫" });
        return false;
    }
    return true;
};
exports.isAuthenticatedRequest = isAuthenticatedRequest;
