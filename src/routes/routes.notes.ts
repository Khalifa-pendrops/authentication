import express from "express";
import { createNote, getNotes } from "../controllers/controllers.notes";
import { authenticate } from "../middleware/validateRequest";
import { AuthenticatedRequest } from "../interfaces/interfaces.auth";

const router = express.Router();

// Apply the authenticate middleware to all note routes
router.use(authenticate as express.RequestHandler);

// Define note routes
router.post("/", (req, res) => createNote(req as AuthenticatedRequest, res));
router.get("/", (req, res) => getNotes(req as AuthenticatedRequest, res));

// Uncomment and implement these routes as needed
// router.get("/:id", NoteController.getNoteById);
// router.put("/:id", NoteController.updateNote);
// router.delete("/:id", NoteController.deleteNote);
// router.get("/categories/:categoryId", NoteController.getNotesByCategoryId);

export default router;
