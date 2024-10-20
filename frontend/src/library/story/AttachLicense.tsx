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
const AttachLicenseComponent = ({ childID }:
     {  childID: `0x${string}` 
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

                const AttachResponse = await client.license.attachLicenseTerms({
                    ipId: childID as Address,
                    licenseTemplate: "0x8BB1ADE72E21090Fc891e1d4b88AC5E57b27cB31",
                    licenseTermsId: 161 as unknown as bigint,
                    txOptions: { waitForTransaction: true }
                });
                console.log(AttachResponse)
                console.log(`License attached at transaction hash ${AttachResponse.txHash}`);
            

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


export default AttachLicenseComponent