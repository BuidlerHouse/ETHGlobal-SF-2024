"ued server"

import Footer from "@/components/Footer/foot"
import Hero from "@/components/Landing/hero"
import NavBar from "@/components/Navbar/navBar"

export const dynamic = "force-dynamic"

export default async function Home() {
    return (
        <div className="lg:py-0 hero min-h-screen bg-inherit">
            <NavBar />
            <Hero />
            <Footer />
        </div>
    )
}
