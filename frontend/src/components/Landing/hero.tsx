"use client"
import { useNotification } from "@/context/notificationContext"
import { useUser } from "@/context/userContext"
import WrappedRegisterIPAComponent from "@/library/story/RegisterIPA"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { useRouter } from "next/navigation"
import React from "react"

const Hero: React.FC = () => {
    const { authorized } = useUser()
    const { addNotification } = useNotification()
    const { primaryWallet } = useDynamicContext()
    const router = useRouter()

    return (
        <div className="flex flex-col justify-center items-center gap-6 w-full">
            <h1 className="text-3xl font-bold animate-pulse">dAIp</h1>
            <p className="px-[20%]">
                <strong className="text-[20px]">dAIp</strong> is a website builder for creating
                composable, IP-protected Dapps, empowering builders&apos; monetization through AI
                and royalties.
            </p>
            <button
                className="btn btn-neutral hover:opacity-80 active:opacity-90"
                onClick={() => {
                    if (authorized) {
                        router.push("/design")
                    } else {
                        addNotification("Please sign up or log in to continue", "info")
                    }
                }}
            >
                Start Design
            </button>
            {primaryWallet?.address && (
                <WrappedRegisterIPAComponent address={primaryWallet.address} />
            )}
        </div>
    )
}

export default Hero
