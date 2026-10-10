
import type { Metadata } from "next";
import Header from "./Header";
import Footer from "./Footer";
import "./globals.css";


export const metadata: Metadata = {
  title: "My Website",
  description: "My basic website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}