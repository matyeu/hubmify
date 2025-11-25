import { Request, Response, NextFunction } from "express";
import "../types/express-session.js";
import { unAuthorizedError } from "../handler/responseHandler.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    return unAuthorizedError(res, "Authentification requise.");
  }
  next();
};
