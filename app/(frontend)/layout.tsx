
import type { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
