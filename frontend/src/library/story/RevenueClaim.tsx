"use client"
import { Address, custom, http, Transport } from "viem"
import { uploadJSONToIPFS } from "./utils/uploadToIpfs"
import { createHash } from "crypto"
import { CurrencyAddress } from "./utils/utils"
import { useState } from "react"
import { useWalletClient } from "wagmi"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import {
    PIL_TYPE,
    StoryClient,
    StoryConfig,
    CollectRoyaltyTokensResponse,
    SnapshotResponse,
    ClaimRevenueResponse,
} from "@story-protocol/core-sdk"
import { isEthereumWallet } from "@dynamic-labs/ethereum"
import { useUser } from "@/context/userContext"
import { useNotification } from "@/context/notificationContext"

// A React functional component that handles the registration logic
const RevenueClaimComponent = ({ childID }: { childID: `0x${string}` }) => {
    const { primaryWallet } = useDynamicContext()
    const { addNotification } = useNotification()
    const [loading, setLoading] = useState(false)
    const result = useWalletClient()

    const handleRegisterIPA = async () => {
        setLoading(true)

        try {
            if (primaryWallet && isEthereumWallet(primaryWallet)) {
                const walletClient = await primaryWallet.getWalletClient()

                console.log("wallet", result)
                const config: StoryConfig = {
                    wallet: walletClient,
                    transport: http(process.env.RPC_PROVIDER_URL),
                    chainId: "iliad",
                }
                const client = StoryClient.newClient(config)

                const snapshotResponse: SnapshotResponse = await client.royalty.snapshot({
                    royaltyVaultIpId: childID as Address,
                    txOptions: { waitForTransaction: true },
                })

                addNotification(
                    `Took a snapshot with ID ${snapshotResponse.snapshotId} at transaction hash ${snapshotResponse.txHash}`,
                    "success"
                )
                const claimRevenueResponse: ClaimRevenueResponse =
                    await client.royalty.claimRevenue({
                        snapshotIds: [snapshotResponse.snapshotId as bigint],
                        royaltyVaultIpId: childID as Address,
                        token: "0x91f6F05B08c16769d3c85867548615d270C42fC7",
                        txOptions: { waitForTransaction: true },
                    })
                addNotification(
                    `Claimed revenue ${claimRevenueResponse.claimableToken} at transaction hash ${claimRevenueResponse.txHash}`,
                    "success"
                )
            }
        } catch (error) {
            console.error("Error registering IPA:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleRegisterIPA}
                disabled={loading}
                style={{ position: "fixed", left: "90px" }}
                className="btn btn-outline bottom-5 bg-white"
            >
                {loading ? "Registering..." : "Claim Revenue"}
            </button>
        </div>
    )
}

export default RevenueClaimComponent
