import express from "express";
import { sessionMiddleware } from "@/utils/session";
import cors from "cors";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(sessionMiddleware);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: "Erreur serveur", errors: err });
  }
);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
