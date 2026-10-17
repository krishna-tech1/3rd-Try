import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muthu Krishnan A — Full-Stack & Mobile Engineer",
  description:
    "Portfolio of Muthu Krishnan A, full-stack and mobile engineer from Chennai, India building web, mobile, and AI-powered products from idea to production.",
  keywords: [
    "Muthu Krishnan",
    "Muthu Krishnan A",
    "Full-Stack Engineer",
    "Mobile Developer",
    "Next.js Developer",
    "Flutter Developer",
    "Chennai Software Engineer",
  ],
  authors: [{ name: "Muthu Krishnan A" }],
  creator: "Muthu Krishnan A",
  metadataBase: new URL("https://muthukrishnan.dev"),
  openGraph: {
    title: "Muthu Krishnan A — Full-Stack & Mobile Engineer",
    description:
      "Full-stack and mobile engineer building websites, apps, and AI-powered tools.",
    type: "website",
    locale: "en_US",
    siteName: "Muthu Krishnan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muthu Krishnan A — Full-Stack & Mobile Engineer",
    description:
      "Full-stack and mobile engineer building websites, apps, and AI-powered tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-white text-[#0A0A0A] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
          <CaseStudyModal />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
