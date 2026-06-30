import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "SiteLens AI — Website Intelligence Platform",
  description:
    "AI-powered website analysis that reveals performance, SEO, design, UX, and conversion insights in seconds. See what your website cannot tell you.",
  keywords: "website analysis, AI audit, SEO checker, performance analysis, UX review, website intelligence",
  openGraph: {
    title: "SiteLens AI — Website Intelligence Platform",
    description: "See what your website cannot tell you.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased noise-overlay`}>
        {children}
      </body>
    </html>
  );
}
