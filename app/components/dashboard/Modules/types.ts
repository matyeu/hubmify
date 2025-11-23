import { ReactNode } from "react";

export interface ModuleConfig {
  title: string;
  icon: ReactNode;
  badge?: string;
  tabs?: { label: string; icon: ReactNode }[];
  warningMessage?: string;
  sizeOptions?: boolean;
  themeOptions?: boolean;
  displayModeOptions?: boolean;
  actionButtons?: {
    label: string;
    variant: "primary" | "secondary";
    onClick?: () => void;
  }[];
}
