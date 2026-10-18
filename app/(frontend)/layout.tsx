
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  metadataBase: new URL("https://newanext.bond"),
  title: {
    default: "NewaNext |Technology company in Nepal",
    template: "%s | NewaNext",
  },
  description:
    "NewaNext is a technology company from Nepal offering software development, web development and IT education.",
  openGraph: {
    title: "NewaNext | Technology Company in Nepal",
    description:
      "Software development, technology services and IT education in Nepal.",
    url: "https://newanext.bond",
    siteName: "NewaNext",
    type: "website",
  },
}

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
