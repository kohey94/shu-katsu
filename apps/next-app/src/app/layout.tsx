import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shu-katsu",
  description: "「週活」からはじめる「終活」を。AIが人生のファーストステップを提案します。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9073089736288753"
          crossorigin="anonymous"
        ></script>
      </head>
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>{children}</body>
    </html>
  );
}
