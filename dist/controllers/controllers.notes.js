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
exports.getNoteByCategoryId = exports.deleteNote = exports.updateNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const services_notes_1 = __importDefault(require("../services/services.notes"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, categoryId } = req.body;
    try {
        const newNote = yield services_notes_1.default.createNote(title, content, categoryId, req.user.userId);
        res.status(201).json({
            success: true,
            message: "Note created successfully!",
            data: newNote,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createNote = createNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield services_notes_1.default.getAllNotes(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: notes,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNotes = getNotes;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const note = yield services_notes_1.default.getNoteById(id, req.user.userId);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data: note,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNote = getNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    try {
        const updatedNote = yield services_notes_1.default.updateNote(id, title, content, categoryId, req.user.userId);
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedNote = yield services_notes_1.default.deleteNote(id, req.user.userId);
        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: deletedNote,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteNote = deleteNote;
const getNoteByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, categoryId } = req.params;
    try {
        const notes = yield services_notes_1.default.getNoteByCategoryId(id, categoryId, req.user.userId);
        res.status(200).json({
            success: true,
            message: "Notes fetched by category successfully",
            data: notes,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNoteByCategoryId = getNoteByCategoryId;
