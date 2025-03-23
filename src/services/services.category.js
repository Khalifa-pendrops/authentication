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
Object.defineProperty(exports, "__esModule", { value: true });
const models_category_1 = require("../models/models.category");
class CategoryService {
    createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield models_category_1.Category.create({ name });
            return newCategory;
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_category_1.Category.find({});
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_category_1.Category.findById(categoryId);
        });
    }
    updateCategory(categoryId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_category_1.Category.findByIdAndUpdate(categoryId, { name }, {
                new: true,
            });
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_category_1.Category.findByIdAndDelete(categoryId);
        });
    }
}
exports.default = new CategoryService();
