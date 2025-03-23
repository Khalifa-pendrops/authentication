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
const models_user_1 = require("../models/models.user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_validation_1 = require("./../utils/schema.validation");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined. Check your environment variables.");
}
class UserServices {
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, schema_validation_1.validateUserInput)(username, email, password);
            if (errors.length > 0)
                throw new Error(errors.join(" "));
            const existingUser = yield models_user_1.User.findOne({
                username: username,
                email: email,
            });
            if (existingUser) {
                throw new Error("Username or Password already exists!");
            }
            const newUser = new models_user_1.User({ username, email, password });
            yield newUser.save();
            const myPayload = {
                userId: newUser._id.toString(),
                username: newUser.username,
            };
            const token = jsonwebtoken_1.default.sign(myPayload, JWT_SECRET, { expiresIn: "1h" });
            return token;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_user_1.User.findOne({ email });
            if (!user)
                throw new Error("Login credential(s) is not valid!");
            const isMatch = yield user.comparePassword(password);
            if (!isMatch)
                throw new Error("Invalid credential(S)!");
            const myPayload = {
                userId: user._id.toString(),
                username: user.username,
            };
            const token = jsonwebtoken_1.default.sign(myPayload, JWT_SECRET, { expiresIn: "1h" });
            return token;
        });
    }
}
exports.default = new UserServices();
