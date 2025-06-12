import "@/styles/globals.css";
import "@hidstech/common_components/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Inter, Orbitron } from 'next/font/google';

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./providers";


const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: "CoachR",
  description: "CoachR",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`${inter.className} ${orbitron.variable} bg-[#E9EAEC]  dark:bg-secondary`}>
        <Providers>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
