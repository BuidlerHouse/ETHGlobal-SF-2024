// import DynamicProvider from "@/context/dynamic"
// import NavBar from "@/components/Navbar/navBar"
// import { UserProvider } from "@/context/userContext"
// import { NotificationProvider } from "@/context/notificationContext"
// import { createConfig, http, WagmiProvider } from "wagmi"
// import { iliad } from "@story-protocol/core-sdk"
// import { QueryClient } from "@tanstack/query-core"
// import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"
// import { QueryClientProvider } from "@tanstack/react-query"


// export default function Provider({children}: Readonly<{children: React.ReactNode}>) {
//     return (
//                 <DynamicContextProvider settings={{appName: "Test", environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID! }}>
//                     <WagmiProvider config={config}>
//                         <QueryClientProvider client={queryClient}>
//                             <UserProvider>
//                                 <NotificationProvider>
//                                     <DynamicProvider>
//                                         {children}
//                                         {/* <ThemeDropDown /> */}
//                                     </DynamicProvider>
//                                 </NotificationProvider>
//                             </UserProvider>
//                         </QueryClientProvider>
//                     </WagmiProvider>
//                 </DynamicContextProvider>

//     )
// }
