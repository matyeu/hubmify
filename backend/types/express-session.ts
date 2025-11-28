import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    discordState?: string;
    discordAccessToken?: string;
    discordUserData?: {
      id: string;
      username: string;
      email: string;
    };
  }
}
