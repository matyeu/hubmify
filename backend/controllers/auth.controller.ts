import { Request, Response } from "express";
import "../types/express-session";
import {
  redirectResponse,
  serverError,
  successResponse,
  unAuthorizedError,
} from "../handler/responseHandler";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const authController = {
  async discordAuth(req: Request, res: Response) {
    try {
      if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
        return serverError(res);
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
      redirectResponse(res, discordAuthUrl);
    } catch (error) {
      console.error("Erreur lors de l'authentification Discord:", error);
      serverError(res);
    }
  },

  async discordCallback(req: Request, res: Response) {
    try {
      const { code, state, error } = req.query;

      if (error || !code || !state || state !== req.session.discordState)
        return serverError(res);

      if (
        !DISCORD_CLIENT_ID ||
        !DISCORD_CLIENT_SECRET ||
        !DISCORD_REDIRECT_URI
      ) {
        return serverError(res);
      }

      successResponse(res, "Utilisateur authentifié avec succès.");
    } catch (error: any) {
      console.error("Erreur lors du callback Discord:", error);
      serverError(res);
    }
  },

  async me(req: Request, res: Response) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return unAuthorizedError(res);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      serverError(res);
    }
  },
};
