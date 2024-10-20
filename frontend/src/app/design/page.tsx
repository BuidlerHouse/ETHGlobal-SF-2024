"ued server"

import ChatMainLayout from "@/components/Chat/chatMainLayout"
import Design from "@/components/Design/design"
import Footer from "@/components/Footer/foot"

export const dynamic = "force-dynamic"

export default async function Home() {
    
    return (
        <div className="lg:py-0 hero min-h-screen bg-inherit flex flex-col justify-start">
            <div className="w-full h-auto bg-black text-white text-[12px] text-center fixed">
                You are seeing this because you’re currently designing your page.
            </div>
            <Design />
            <Footer />
        </div>
    )
}
