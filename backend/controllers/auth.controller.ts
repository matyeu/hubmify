import { Request, Response } from "express";
import "../types/express-session";
import {
  redirectResponse,
  serverError,
  successResponse,
  unAuthorizedError,
} from "../handler/responseHandler";
import { UserModel } from "../models/user.model";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

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

      // Échange du code contre un token d'accès
      const tokenResponse = await fetch(
        "https://discord.com/api/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code as string,
            redirect_uri: DISCORD_REDIRECT_URI,
          }),
        }
      );

      if (!tokenResponse.ok) {
        return serverError(res);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Récupération des informations utilisateur depuis Discord
      const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        return serverError(res);
      }

      const discordUser = await userResponse.json();
      const email = discordUser.email;

      if (!email) {
        return serverError(res);
      }

      // Vérification si l'utilisateur existe déjà
      const existingUser = await UserModel.findByEmail(email);

      if (!existingUser) {
        // L'utilisateur n'existe pas, on retourne l'email pour afficher la modal
        req.session.discordAccessToken = accessToken;
        req.session.discordUserData = discordUser;
        return res.status(200).json({
          status: "user_not_found",
          email: email,
          message:
            "L'utilisateur n'existe pas. Veuillez compléter vos informations.",
        });
      }

      // L'utilisateur existe, on crée la session
      req.session.userId = existingUser.id;
      req.session.discordState = undefined;

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
