
import type { Metadata } from "next";
import Header from "./Header";


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
      </body>
    </html>
  );
}