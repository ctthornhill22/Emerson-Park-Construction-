import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Emerson Park Construction | Custom Home Builder Ocala FL",
    template: "%s | Emerson Park Construction",
  },
  description:
    "Emerson Park Construction crafts custom homes with a style-first approach. Discover your architectural direction with our Home Style Discovery Quiz before we ever meet.",
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
      className={`${cormorant.variable} ${jost.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5EFE4] text-[#3D3226]">
        {children}
      </body>
    </html>
  );
}
