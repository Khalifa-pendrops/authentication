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
const services_category_1 = __importDefault(require("../services/services.category"));
class CategoryController {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const newCategory = yield services_category_1.default.createCategory(name);
                res.status(201).json({
                    success: true,
                    message: "Category created successfully!",
                    data: newCategory,
                });
            }
            catch (err) {
                res.status(500).json({ message: "Error creating category", err });
            }
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield services_category_1.default.getAllCategories();
                res.status(200).json({
                    success: true,
                    message: "Categories retrieved successfully",
                    data: categories,
                });
            }
            catch (err) {
                res.status(500).json({ message: "Error fetching categories", err });
            }
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield services_category_1.default.getCategoryById(id);
                if (!category) {
                    return res.status(404).json({
                        success: false,
                        message: "Category not found",
                    });
                }
                res.json({
                    success: true,
                    message: "Category fetched successfuly!",
                    data: category,
                });
            }
            catch (err) {
                res.status(500).json({ message: "Error fetching category", err });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name } = req.body;
                if (!name) {
                    return res.status(400).json({
                        success: false,
                        message: "Name is required for updating the category",
                    });
                }
                const updatedCategory = yield services_category_1.default.updateCategory(id, name);
                if (!updatedCategory) {
                    return res.status(404).json({
                        success: false,
                        message: "Category not found",
                    });
                }
                res.status(200).json({
                    success: true,
                    message: "Category updated successfully!",
                    data: updatedCategory,
                });
            }
            catch (err) {
                res
                    .status(500)
                    .json({ message: "Error updating category", error: err.message });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedCategory = yield services_category_1.default.deleteCategory(id);
                res.status(200).json({
                    success: true,
                    message: "Category deleted",
                    deletedCategory,
                });
            }
            catch (err) {
                res.status(500).json({ message: "Error deleting category", err });
            }
        });
    }
}
exports.default = new CategoryController();
