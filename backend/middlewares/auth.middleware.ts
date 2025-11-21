import { Request, Response, NextFunction } from "express";
import "../types/express-session.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    return res.status(401).json({
      status: "error",
      message: "Authentification requise",
    });
  }
  next();
};
