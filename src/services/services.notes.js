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
const models_notes_1 = require("../models/models.notes");
const schema_validation_1 = require("../utils/schema.validation");
class NoteService {
    findOne(query) {
        throw new Error("Method not implemented.");
    }
    createNote(title, content, categoryId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, schema_validation_1.validateNoteInput)(title, content, categoryId);
            if (errors.length > 0)
                throw new Error(errors.join(" "));
            const newNote = yield models_notes_1.Note.create({
                title,
                content,
                category: categoryId,
                user: userId,
            });
            return newNote;
        });
    }
    getAllNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_notes_1.Note.find({ user: userId }).populate("category");
        });
    }
    getNoteById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_notes_1.Note.findById({ _id: id, userId: userId }).populate("category");
        });
    }
    updateNote(id, title, content, categoryId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_notes_1.Note.findByIdAndUpdate({ _id: id, user: userId }, { title, content, category: categoryId }, {
                new: true,
            }).populate("category");
        });
    }
    deleteNote(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_notes_1.Note.findByIdAndDelete({ _id: id, userId: userId });
        });
    }
    getNoteByCategoryId(id, userId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_notes_1.Note.find({ _id: id, user: userId, category: categoryId });
        });
    }
}
exports.default = new NoteService();
