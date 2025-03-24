import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  getNoteByCategoryId,
} from "../controllers/controllers.notes";
import { authenticate } from "../middleware/validateRequest";
import { AuthenticatedRequest } from "../interfaces/interfaces.auth";

const router = express.Router();

// Apply the authenticate middleware to all note routes
router.use(authenticate as express.RequestHandler);

// Define note routes
router.post("/", (req, res) => createNote(req as AuthenticatedRequest, res));
router.get("/", (req, res) => getNotes(req as AuthenticatedRequest, res));
router.get("/:id", (req, res) => getNote(req as AuthenticatedRequest, res));
router.put("/:id", (req, res) => updateNote(req as AuthenticatedRequest, res));
router.delete("/:id", (req, res) =>
  deleteNote(req as AuthenticatedRequest, res)
);
router.get("/categories/:categoryId", (req, res) =>
  getNoteByCategoryId(req as AuthenticatedRequest, res)
);

export default router;

