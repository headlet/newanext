import Mern from "@/components/Mern"
import Header from "@/components/Header";
import Footer from "../../components/Footer";


export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            <Header />
            <Mern />
            <Footer />
        </main>
    );
}