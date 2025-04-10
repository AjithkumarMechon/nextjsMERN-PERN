import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/Redux/Store/ReduxProvider";
import SessionProviderWrapper from "@/component/SessionProviderGoogle/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AKTrends",
  description: "Hygineic food essential to our healthy life. You and your family health is our periority!.",
   icons: {
    icon: "favicon.svg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>            
          <ReduxProvider>
              <SessionProviderWrapper>
              {children}                 
              </SessionProviderWrapper>   
          </ReduxProvider>
      </body>
    </html>
  );
}
 