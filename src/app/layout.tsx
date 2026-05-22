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
    default: "Emerson Park Design & Construction | Custom Home Builder Ocala FL",
    template: "%s | Emerson Park Design & Construction",
  },
  description:
    "Emerson Park Design & Construction crafts custom homes with a style-first approach. Take our three-stage Style Quiz and receive an AI rendering, interior mood board, and cost estimate — free.",
  metadataBase: new URL("https://buildemersonpark.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildemersonpark.com",
    siteName: "Emerson Park Design & Construction",
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
