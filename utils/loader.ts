import { Router, Express } from "express";
import path from "path";
import fs from "fs";
import logger from "./logger";
import chalk from "chalk";

/**
 * @returns
 */
export function loadRoutes(): Record<string, Router> {
  const routesDirectory = path.join(__dirname, "../backend/routes");
  const routes: Record<string, Router> = {};

  if (!fs.existsSync(routesDirectory)) {
    logger.error(`Routes directory does not exist: ${routesDirectory}`);
    return routes;
  }

  const files = fs.readdirSync(routesDirectory);

  files.forEach((file) => {
    if (file.endsWith(".route.ts") || file.endsWith(".route.js")) {
      const routeName = file.replace(".route.ts", "").replace(".route.js", "");

      try {
        const routePath = `${routesDirectory}/${routeName}.route`;

        const routeModule = require(routePath);
        const router = routeModule.default || routeModule;

        if (router && typeof router === "function") {
          routes[routeName] = router;
        } else {
          logger.error(`Route ${file} does not export a valid Express router`);
        }
      } catch (error: any) {
        logger.error(`Error loading route ${file}: ${error.message}`);
      }
    }
  });

  return routes;
}

/**
 * @param routeName
 * @returns
 */
export function getRoute(routeName: string): Router | null {
  const routes = loadRoutes();
  return routes[routeName] || null;
}

/**
 * @param routeName
 * @returns
 */
function generateRoutePath(routeName: string): string {
  return `/api/${routeName}`;
}

/**
 * @param app
 */
export function registerRoutes(app: Express): void {
  const routes = loadRoutes();

  if (Object.keys(routes).length === 0) {
    logger.error("Aucune route trouvée dans le dossier routes");
    return;
  }

  console.log(chalk.grey("--------------------------------"));

  const routeNames = Object.keys(routes).filter((name) => name !== "error");
  const errorRoute = routes.error;

  routeNames.forEach((routeName) => {
    const route = routes[routeName];
    const path = generateRoutePath(routeName);

    if (!route) {
      logger.error(`${routeName} is null or undefined`);
      return;
    }

    app.use(path, route);
    logger.route(
      `${chalk.cyan(routeName)} registered on ${chalk.yellow(path)}`
    );
  });

  if (errorRoute) {
    const errorPath = generateRoutePath("error");
    app.use(errorPath, errorRoute);
    logger.route(
      `Route ${chalk.cyan("error")} registered on ${chalk.yellow(errorPath)}`
    );
  }

  console.log(chalk.grey("--------------------------------"));
}
