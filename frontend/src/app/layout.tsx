import type { Metadata } from "next";
import { Montserrat, Quicksand, Farsan } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: "variable",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: "variable",
  subsets: ["latin"],
});

const farsan = Farsan({
  variable: "--font-farsan",
  weight:"400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin",
  description: "My awesome portfolio as a geospatial developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${quicksand.variable} ${farsan.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
