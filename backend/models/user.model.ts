import { database } from "@/utils/database";
import logger from "@/utils/logger";

export interface User {
  id?: number;
  email: string;
  firstname?: string;
  lastname?: string;
  subscription?: "free" | "pro";
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserModel = {
  create: async (user: User): Promise<User> => {
    const now = new Date();
    const userData: User = {
      ...user,
      subscription: "free",
      createdAt: now,
      updatedAt: now,
    };
    const [result] = await database.query("INSERT INTO users SET ?", [
      userData,
    ]);
    const insertResult = result as any;
    logger.database(`User ${user.email} created in the database`);
    return {
      ...userData,
      id: insertResult.insertId,
    };
  },

  findByEmail: async (email: string): Promise<User | null> => {
    const [rows] = await database.query(
      "SELECT email FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  },
};
