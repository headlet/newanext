import type { Metadata } from "next";

import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Products from "./components/Products";

export const metadata: Metadata = {
  title: "NewaNext | Best Software Company in Nepal",
  description:
    "NewaNext is a premier software company in Nepal specializing in custom web applications, SaaS development, full-stack software engineering, and modern IT solutions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NewaNext | Best Software Company in Nepal",
    description:
      "NewaNext is a premier software company in Nepal specializing in custom web applications, SaaS development, full-stack software engineering, and modern IT solutions.",
    url: "https://newanext.bond",
    siteName: "NewaNext",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewaNext | Best Software Company in Nepal",
    description:
      "NewaNext is a premier software company in Nepal specializing in custom web applications, SaaS development, full-stack software engineering, and modern IT solutions.",
  },
  keywords: [
    "best software company in Nepal",
    "software development Nepal",
    "web development Kathmandu",
    "IT company Nepal",
    "NewaNext",
    "custom software development Kathmandu",
    "top IT company in Nepal",
    "SaaS development Nepal",
    "Next.js developer Nepal",
    "web application design Kathmandu",
    "React developers Nepal",
    "full stack web development Nepal",
    "software solution provider Kathmandu",
    "tech startup Nepal",
    "best software company in Kathmandu",
    "website design company Nepal",
    "enterprise software development Nepal",
    "UI UX design Nepal",
    "software consultancy Nepal",
    "digital agency Kathmandu",
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Courses />
      <Products />
      <Portfolio />
      <Contact />
    </>
  );
}