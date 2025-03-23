"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_user_1 = __importDefault(require("../services/services.user"));
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const token = yield services_user_1.default.register(username, email, password);
                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    token: token,
                    // data: user,
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield services_user_1.default.login(email, password);
                res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    token: token,
                });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = new UserController();
