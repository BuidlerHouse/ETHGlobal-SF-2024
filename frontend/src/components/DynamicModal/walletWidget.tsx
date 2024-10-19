"use client"

import { useUser } from "@/context/userContext"
import { DynamicWidget, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import { useRouter } from "next/navigation"

export default function DynamicConnectButton() {
    const { user, authorized, userLogging, setUserLogging } = useUser()
    const { setShowAuthFlow } = useDynamicContext()
    const { primaryWallet } = useDynamicContext()
    const isLoggedIn = useIsLoggedIn();
    const router = useRouter()
    
    return (
        <>
            {user === null && (
                <button
                    className="btn btn-neutral flex justify-center items-center min-w-[120px] "
                    onClick={() => {
                        setUserLogging(true)
                        setShowAuthFlow(true)
                    }}
                >
                    {userLogging ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "sign in or sign up"
                    )}
                </button>
            )}
            {authorized && (
                <>
                    <DynamicWidget variant="modal" />
                </>
            )}
        </>
    )
}
