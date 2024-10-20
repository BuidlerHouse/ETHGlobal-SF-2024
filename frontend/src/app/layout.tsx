import type { Metadata } from "next"
import "./globals.css"
import DynamicProvider from "@/context/dynamic"
import NavBar from "@/components/Navbar/navBar"
import { UserProvider } from "@/context/userContext"
import { NotificationProvider } from "@/context/notificationContext"
import { createConfig, http, WagmiProvider } from "wagmi"
import { iliad } from "@story-protocol/core-sdk"
import { QueryClient } from "@tanstack/query-core"
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"
import { QueryClientProvider } from "@tanstack/react-query"

export const metadata: Metadata = {
    title: "dAIp App",
    description: "dAIp App",
}

const config = createConfig({
    chains: [iliad],
    multiInjectedProviderDiscovery: false,
    transports: {
        [iliad.id]: http()
    }
})


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" data-theme="lofi">
            <body className="">
                    
                        
                            <UserProvider>
                                <NotificationProvider>
                                    <DynamicProvider>
                                    
                                        {children}
                                        {/* <ThemeDropDown /> */}
                                    </DynamicProvider>
                                </NotificationProvider>
                            </UserProvider>
                            
                    
            </body>
        </html>
    )
}
