"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_auth_1 = __importDefault(require("../routes/routes.auth"));
const routes_notes_1 = __importDefault(require("../routes/routes.notes"));
const route_category_1 = __importDefault(require("../routes/route.category"));
const router = express_1.default.Router();
router.use("/users", routes_auth_1.default);
router.use("/notes", routes_notes_1.default);
router.use("/categories", route_category_1.default);
exports.default = router;
