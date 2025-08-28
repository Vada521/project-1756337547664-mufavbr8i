import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { ABTestProvider, AnalyticsDashboard } from "@/components/ABTestFramework";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trademark Factory - Fast Track Quiz",
  description: "Take our comprehensive quiz to discover if your brand is ready for trademark protection. Get expert guidance for your intellectual property journey.",
  keywords: ["trademark", "brand protection", "intellectual property", "legal services", "trademark registration"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ABTestProvider>
          {children}
          <ChatWidget />
          <ExitIntentPopup />
          <AnalyticsDashboard />
        </ABTestProvider>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
