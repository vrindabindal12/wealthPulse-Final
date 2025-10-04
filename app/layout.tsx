import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FinancialAdvisorChatbot from "./components/FinancialAdvisorChatbot";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Navbar from "./components/Navbar";
import NotificationToast from "./components/NotificationToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WealthPulse - Smart Investment Platform",
  description: "AI-driven investment platform with personalized recommendations, live market analysis, and automated portfolio management. Make informed, data-driven investment decisions effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        <PortfolioProvider>
          <Navbar />
          <main>{children}</main>
          <NotificationToast />
          <FinancialAdvisorChatbot />
        </PortfolioProvider>
      </body>
    </html>
  );
}