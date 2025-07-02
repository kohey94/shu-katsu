import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shu-katsu",
  description: "「週活」からはじめる「終活」を。AIが人生のファーストステップを提案します。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            strategy="beforeInteractive"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
