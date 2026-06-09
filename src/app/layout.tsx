import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dusk | Full-Stack Developer",
  description:
    "Full-stack developer building modern web apps, REST APIs, and Discord bots with clean code and premium design.",
  keywords: [
    "full-stack developer",
    "web developer",
    "api developer",
    "discord bot developer",
    "react developer",
    "next.js",
    "typescript",
    "node.js",
    "portfolio",
    "dusk",
  ],
  authors: [{ name: "Dusk" }],
  openGraph: {
    title: "Dusk | Full-Stack Developer",
    description:
      "Full-stack developer building modern web apps, REST APIs, and Discord bots.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dusk | Full-Stack Developer",
    description:
      "Full-stack developer building modern web apps, REST APIs, and Discord bots.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-dark-500 text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
