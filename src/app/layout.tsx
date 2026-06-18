import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ashish Pramanik | Discord Bot Developer & Full-Stack Creator",
  description:
    "Discord Bot Developer, Backend Architect & Open Source Creator. Building premium bots, scalable APIs, and modern web experiences.",
  keywords: [
    "Ashish Pramanik",
    "Discord Bot Developer",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "Open Source",
    "Portfolio",
  ],
  authors: [{ name: "Ashish Pramanik" }],
  openGraph: {
    title: "Ashish Pramanik | Discord Bot Developer & Full-Stack Creator",
    description:
      "Discord Bot Developer, Backend Architect & Open Source Creator.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Pramanik | Discord Bot Developer & Full-Stack Creator",
    description:
      "Discord Bot Developer, Backend Architect & Open Source Creator.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#050510] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
