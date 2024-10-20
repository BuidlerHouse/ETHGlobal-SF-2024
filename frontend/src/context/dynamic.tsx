"use client"

import React from "react"
import { DynamicContextProvider, getAuthToken, DynamicWidget } from "@dynamic-labs/sdk-react-core"
import { getCsrfToken } from "next-auth/react"
import { useUser } from "./userContext"
// https://docs.dynamic.xyz/sdks/react-sdk/providers/dynamiccontextprovider#initiate-dynamic-with-ethereum-and-starknet-wallets-enabled
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { FlowWalletConnectors } from "@dynamic-labs/flow"
import { createConfig, http, WagmiProvider } from "wagmi"
import { iliad } from "@story-protocol/core-sdk"
import { QueryClient } from "@tanstack/query-core"
import { QueryClientProvider } from "@tanstack/react-query"
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector"
interface AppProps {
    children: React.ReactNode
}
const evmNetworks = [
    //     {
    //       blockExplorerUrls: ['https://etherscan.io/'],
    //       chainId: 1,
    //       chainName: 'Ethereum Mainnet',
    //       iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    //       name: 'Ethereum',
    //       nativeCurrency: {
    //         decimals: 18,
    //         name: 'Ether',
    //         symbol: 'ETH',
    //         iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
    //       },
    //       networkId: 1,

    //       rpcUrls: ['https://mainnet.infura.io/v3/'],
    //       vanityName: 'ETH Mainnet',
    //     },
    //   {
    //       blockExplorerUrls: ['https://etherscan.io/'],
    //       chainId: 5,
    //       chainName: 'Ethereum Goerli',
    //       iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    //       name: 'Ethereum',
    //       nativeCurrency: {
    //         decimals: 18,
    //         name: 'Ether',
    //         symbol: 'ETH',
    //         iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
    //       },
    //       networkId: 5,
    //       rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],

    //       vanityName: 'Goerli',
    //     },
    //     {
    //       blockExplorerUrls: ['https://polygonscan.com/'],
    //       chainId: 137,
    //       chainName: 'Matic Mainnet',
    //       iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    //       name: 'Polygon',
    //       nativeCurrency: {
    //         decimals: 18,
    //         name: 'MATIC',
    //         symbol: 'MATIC',
    //         iconUrl: 'https://app.dynamic.xyz/assets/networks/polygon.svg',
    //       },
    //       networkId: 137,
    //       rpcUrls: ['https://polygon-rpc.com'],
    //       vanityName: 'Polygon',
    //     },
    {
        blockExplorerUrls: ["https://testnet.storyscan.xyz/"],
        chainId: 1513,
        chainName: "Story Public Testnet",
        iconUrls: [
            "https://images.ctfassets.net/5ei3wx54t1dp/5ckeqBCMdZeazgUHzbHXPt/1021e9047c960b9d1f3b9b74726d877c/Story_Protocol_Icon.svg",
        ],
        name: "Story",
        nativeCurrency: {
            decimals: 18,
            name: "IP",
            symbol: "IP",
            iconUrl:
                "https://images.ctfassets.net/5ei3wx54t1dp/5ckeqBCMdZeazgUHzbHXPt/1021e9047c960b9d1f3b9b74726d877c/Story_Protocol_Icon.svg",
        },
        networkId: 1513,
        rpcUrls: ["https://testnet.storyrpc.io/"],
        vanityName: "Story Public Testnet",
    },
]

const DynamicProvider: React.FC<AppProps> = ({ children }) => {
    const { logOut, fetchUser, setUserLogging } = useUser()
    const config = createConfig({
        chains: [iliad],
        multiInjectedProviderDiscovery: false,
        transports: {
            [iliad.id]: http(),
        },
    })
    const queryClient = new QueryClient()
    const fetchUserWithRetry = async (maxAttempts = 5): Promise<void> => {
        let attempts = 0

        const executeFetch = async (): Promise<boolean> => {
            attempts++
            setUserLogging(true)

            try {
                const result = await fetchUser()
                if (result) {
                    return true
                } else {
                    throw new Error("Failed to authenticate user")
                }
            } catch (error) {
                console.error(`Attempt ${attempts}:`, error)
                if (attempts < maxAttempts) {
                    // console.log(`Retrying... (${attempts}/${maxAttempts})`)
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    return executeFetch()
                } else {
                    // console.log("Max attempts reached, failed to authenticate user, please refresh page.")
                    return false
                }
            } finally {
                setUserLogging(false)
            }
        }

        await executeFetch()
    }

    return (
        <DynamicContextProvider
            settings={{
                appName: "Test",
                environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
                walletConnectors: [EthereumWalletConnectors],
                eventsCallbacks: {
                    onAuthFlowCancel: async () => {
                        setUserLogging(false)
                    },
                    onAuthSuccess: async () => {
                        const authToken = getAuthToken()
                        if (!authToken) {
                            return
                        }

                        const csrfToken = await getCsrfToken()
                        fetch("/api/auth/callback/credentials", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: `csrfToken=${encodeURIComponent(
                                csrfToken as "string" | number | boolean
                            )}&token=${encodeURIComponent(authToken)}`,
                        })
                            .then((res) => {
                                if (res.ok) {
                                } else {
                                    console.error("Failed to log in")
                                }
                            })
                            .catch((error) => {
                                console.error("Error logging in", error)
                            })
                            .finally(() => {
                                fetchUserWithRetry()
                            })
                    },
                    onLogout: async () => {
                        logOut()
                    },
                },
                overrides: { evmNetworks },
            }}
        >
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <DynamicWagmiConnector>
                        {children}
                        {/* <AccountInfo /> */}
                    </DynamicWagmiConnector>
                </QueryClientProvider>
            </WagmiProvider>
        </DynamicContextProvider>
    )
}

export default DynamicProvider
