"ued server"

import ChatMainLayout from "@/components/Chat/chatMainLayout"
import Design from "@/components/Design/design"
import Footer from "@/components/Footer/foot"

export const dynamic = "force-dynamic"

export default async function Home() {
    
    return (
        <div className="lg:py-0 hero min-h-screen bg-inherit flex flex-col justify-start">
            <Design />
            <Footer />
        </div>
    )
}
