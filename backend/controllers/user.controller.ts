import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import {
  serverError,
  successResponse,
  unAuthorizedError,
} from "../handler/responseHandler";

export const userController = {
  async createFromModal(req: Request, res: Response) {
    try {
      const { firstname, lastname, email } = req.body;

      if (!firstname || !lastname || !email) {
        return res.status(400).json({
          status: "error",
          message: "Tous les champs sont requis.",
        });
      }

      // Vérifie si l'utilisateur existe déjà
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Un utilisateur avec cet email existe déjà.",
        });
      }

      // Vérifie si les données Discord sont en session
      if (!req.session.discordAccessToken || !req.session.discordUserData) {
        return unAuthorizedError(res, "Session Discord invalide.");
      }

      // Vérifie si l'email correspond à celui de Discord
      if (req.session.discordUserData.email !== email) {
        return res.status(400).json({
          status: "error",
          message: "L'email ne correspond pas à celui de votre compte Discord.",
        });
      }

      // Créer l'utilisateur
      const newUser = await UserModel.create({
        email,
        firstname,
        lastname,
      });

      // Créer la session
      req.session.userId = newUser.id;
      req.session.discordAccessToken = undefined;
      req.session.discordUserData = undefined;

      successResponse(res, "Utilisateur créé avec succès.");
    } catch (error: any) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      serverError(res);
    }
  },
};
