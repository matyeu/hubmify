import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.post("/create-from-modal", userController.createFromModal);

export default router;
