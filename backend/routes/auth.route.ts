import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/discord", authController.discordAuth);
router.get("/discord/callback", authController.discordCallback);
router.get("/dashboard", requireAuth, authController.me);

export default router;
