import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import { database } from "./database";

const MySQLStore = MySQLStoreFactory(session as any);

export const sessionMiddleware = session({
  secret: "hubmify_the_best_project_manager",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({}, database as any),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    secure: false,
  },
});
