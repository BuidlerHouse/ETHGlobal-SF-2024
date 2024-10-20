import type { Metadata } from "next"
import "./globals.css"
import DynamicProvider from "@/context/dynamic"
import NavBar from "@/components/Navbar/navBar"
import { UserProvider } from "@/context/userContext"
import { NotificationProvider } from "@/context/notificationContext"
import { StoryProvider } from "@story-protocol/react-sdk"

export const metadata: Metadata = {
    title: "dAIp App",
    description: "dAIp App",
}

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
