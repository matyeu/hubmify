import { Request, Response } from "express";
import "../types/express-session";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const authController = {
  async discordAuth(req: Request, res: Response) {
    try {
      if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
        return res.status(500).json({
          status: "error",
          message: "Configuration Discord manquante",
        });
      }

      const state = Math.random().toString(36).substring(7);
      req.session.discordState = state;

      const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: DISCORD_REDIRECT_URI,
        response_type: "code",
        scope: "identify email",
        state: state,
      });

      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
      res.redirect(discordAuthUrl);
    } catch (error) {
      console.error("Erreur lors de l'authentification Discord:", error);
      res.status(500).json({
        status: "error",
        message: "Erreur lors de l'authentification Discord",
      });
    }
  },

  async discordCallback(req: Request, res: Response) {
    try {
      const { code, state, error } = req.query;

      if (error) {
        return res.redirect(`${FRONTEND_URL}/login?error=${error}`);
      }

      if (!code || !state) {
        return res.redirect(`${FRONTEND_URL}/login?error=missing_params`);
      }

      if (state !== req.session.discordState) {
        return res.redirect(`${FRONTEND_URL}/login?error=invalid_state`);
      }

      if (
        !DISCORD_CLIENT_ID ||
        !DISCORD_CLIENT_SECRET ||
        !DISCORD_REDIRECT_URI
      ) {
        return res.redirect(`${FRONTEND_URL}/login?error=server_config`);
      }

      res.redirect(`${FRONTEND_URL}/dashboard`);
    } catch (error: any) {
      console.error("Erreur lors du callback Discord:", error);
      const errorMessage =
        error.response?.data?.error_description ||
        error.message ||
        "unknown_error";
      res.redirect(`${FRONTEND_URL}/login?error=${errorMessage}`);
    }
  },

  async me(req: Request, res: Response) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return res.status(401).json({
          status: "error",
          message: "Non authentifié",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      res.status(500).json({
        status: "error",
        message: "Erreur serveur",
      });
    }
  },
};
