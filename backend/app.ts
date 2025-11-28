import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import { sessionMiddleware } from "@/utils/session";
import cors from "cors";
import chalk from "chalk";
import logger from "@/utils/logger";
import { registerRoutes } from "@/utils/loader";

const app = express();
const PORT = process.env.APP_PORT;
const IS_PRODUCTION = process.env.MODE === "production";

app.use(express.json());
app.use(sessionMiddleware);
app.use(
  cors({
    origin: IS_PRODUCTION
      ? process.env.NEXT_PUBLIC_FRONTEND_URL_PROD
      : process.env.NEXT_PUBLIC_FRONTEND_URL_DEV,
    credentials: true,
  })
);

registerRoutes(app);

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
  logger.server(
    `Site web on ${
      IS_PRODUCTION
        ? process.env.NEXT_PUBLIC_FRONTEND_URL_PROD
        : process.env.NEXT_PUBLIC_FRONTEND_URL_DEV
    }`
  );
  logger.server(`🚀 Server started on port ${PORT}`);
  console.log(chalk.grey("--------------------------------"));
});
