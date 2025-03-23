"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_notes_1 = require("../controllers/controllers.notes");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
// Apply the authenticate middleware to all note routes
router.use(validateRequest_1.authenticate);
// Define note routes
router.post("/", (req, res) => (0, controllers_notes_1.createNote)(req, res));
router.get("/", (req, res) => (0, controllers_notes_1.getNotes)(req, res));
// Uncomment and implement these routes as needed
// router.get("/:id", NoteController.getNoteById);
// router.put("/:id", NoteController.updateNote);
// router.delete("/:id", NoteController.deleteNote);
// router.get("/categories/:categoryId", NoteController.getNotesByCategoryId);
exports.default = router;
