import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";



export default function Home() {
  return (
    <>
    <Hero />
    <About />
    <Services />
    <Courses />
    <Portfolio />
    <Contact />
    </>
  );
}
