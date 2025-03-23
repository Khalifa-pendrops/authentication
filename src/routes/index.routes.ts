import express from "express";
import userRouter from "../routes/routes.auth";
import noteRouter from "../routes/routes.notes";
import categoryRouter from "../routes/route.category";

const router = express.Router();

router.use("/users", userRouter);
router.use("/notes", noteRouter);
router.use("/categories", categoryRouter);

export default router;
