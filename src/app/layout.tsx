import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Emerson Park Construction | Quality Building & Renovation",
    template: "%s | Emerson Park Construction",
  },
  description:
    "Emerson Park Construction delivers quality residential and commercial construction, renovation, and remodeling services. Built right. Built to last.",
  metadataBase: new URL("https://buildemersonpark.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildemersonpark.com",
    siteName: "Emerson Park Construction",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
