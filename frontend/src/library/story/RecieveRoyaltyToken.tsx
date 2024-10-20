'use client'
import { Address, custom, http, Transport } from "viem"
import { uploadJSONToIPFS } from "./utils/uploadToIpfs"
import { createHash } from "crypto"
import { CurrencyAddress } from "./utils/utils"
import { useState } from "react"
import { useWalletClient } from "wagmi"
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { PIL_TYPE, StoryClient, StoryConfig, CollectRoyaltyTokensResponse } from "@story-protocol/core-sdk"
import { isEthereumWallet } from "@dynamic-labs/ethereum"

// A React functional component that handles the registration logic
const CollectRoyaltyIPAComponent = ({ parentID, childID }:
     {  parentID: `0x${string}`,
        childID: `0x${string}` 
     }) => {
    const { primaryWallet } = useDynamicContext()

    const [loading, setLoading] = useState(false)
    const result = useWalletClient()

 
    const handleRegisterIPA = async () => {
        setLoading(true)

        try {
            if(primaryWallet && isEthereumWallet(primaryWallet)) {
                const walletClient = await primaryWallet.getWalletClient();
            
                console.log("wallet", result)
                const config: StoryConfig = {
                    wallet: walletClient,
                    transport: http(process.env.RPC_PROVIDER_URL),
                    chainId: "iliad",
                }
                const client = StoryClient.newClient(config)

                const collectRoyaltyTokensResponse: CollectRoyaltyTokensResponse = await client.royalty.collectRoyaltyTokens({
                    parentIpId: parentID as Address, 
                    royaltyVaultIpId: childID as Address,
                    txOptions: { waitForTransaction: true },
                })
                console.log(
                    `Collected royalty token ${collectRoyaltyTokensResponse.royaltyTokensCollected} at transaction hash ${collectRoyaltyTokensResponse.txHash}`
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
            <button onClick={handleRegisterIPA} disabled={loading}>
                {loading ? "Registering..." : "Register IPA"}
            </button>
        </div>
    )
}


export default CollectRoyaltyIPAComponent