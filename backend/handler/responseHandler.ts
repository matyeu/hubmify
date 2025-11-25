import type { Response } from "express";

export const serverError = (res: Response) => {
  res.status(500).json({
    status: "error",
    message: "Erreur serveur.",
  });
};

export const unAuthorizedError = (res: Response, message?: string) => {
  res.status(401).json({
    status: "error",
    message: message ? message : "Non autorisé.",
  });
};

export const redirectResponse = (res: Response, redirectUrl: unknown) => {
  res.status(302).json({
    status: "redirect",
    redirectTo: redirectUrl,
  });
};

export const successResponse = (res: Response, message?: string) => {
  res.status(200).json({
    status: "success",
    message: message ? message : "OK.",
  });
};
