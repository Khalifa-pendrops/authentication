"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_category_1 = __importDefault(require("../controllers/controllers.category"));
const router = express_1.default.Router();
router.post("/", controllers_category_1.default.createCategory);
router.get("/", controllers_category_1.default.getAllCategories);
router.get("/:id", controllers_category_1.default.getCategoryById);
router.put("/:id", controllers_category_1.default.updateCategory);
router.delete("/:id", controllers_category_1.default.deleteCategory);
exports.default = router;
