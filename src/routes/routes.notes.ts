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
router.post("/", (req: express.Request, res: express.Response) =>
  createNote(req as AuthenticatedRequest, res)
);
router.get("/", (req: express.Request, res: express.Response) =>
  getNotes(req as AuthenticatedRequest, res)
);
router.get("/:id", (req: express.Request, res: express.Response) =>
  getNote(req as AuthenticatedRequest, res)
);
router.put("/:id", (req: express.Request, res: express.Response) =>
  updateNote(req as AuthenticatedRequest, res)
);
router.delete("/:id", (req: express.Request, res: express.Response) =>
  deleteNote(req as AuthenticatedRequest, res)
);
router.get(
  "/categories/:categoryId",
  (req: express.Request, res: express.Response) =>
    getNoteByCategoryId(req as AuthenticatedRequest, res)
);

export default router;
