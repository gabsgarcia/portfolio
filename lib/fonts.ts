import { Archivo, DM_Sans, JetBrains_Mono } from "next/font/google";

export const display = Archivo({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display" });
export const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
export const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

export const fontVars = `${display.variable} ${sans.variable} ${mono.variable}`;
