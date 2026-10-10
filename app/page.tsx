import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Courses from "./components/Courses";



export default function Home() {
  return (
    <>
    <Hero />
    <About />
    <Courses />
    <Contact />
    </>
  );
}
