import { database } from "@/utils/database";

export interface User {
  id: number;
  discordId: string;
  discordUsername: string;
  discordEmail: string;
  discordAvatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = {};
