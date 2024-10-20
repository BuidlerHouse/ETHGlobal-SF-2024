'use client'
import { Address, custom, http, Transport } from "viem"
import { uploadJSONToIPFS } from "./utils/uploadToIpfs"
import { createHash } from "crypto"
import { CurrencyAddress } from "./utils/utils"
import { useState } from "react"
import { useWalletClient } from "wagmi"
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import {  StoryClient, StoryConfig } from "@story-protocol/core-sdk"
import { isEthereumWallet } from "@dynamic-labs/ethereum"
import { TIMEOUT } from "dns"

const DerivativeIPAComponent =  ({ parentID }: { parentID: `0x${string}` }) => {
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

                const ipMetadata = client.ipAsset.generateIpMetadata({
                    title: "PokemonNFTBattle",
                    description: "This is a code block for PokemonNFTBattle2 Code IP",
                    watermarkImg:
                        "https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png",
                    attributes: [
                        {
                            key: "CodeHash",
                            value: "https://testnet.suivision.xyz/object/0x12fabab08a72acd508ebbfa1ab4f6379777c6fa2d7c4c4438e1f8a158883d9c5",
                        },
                    ],
                })
                console.log("done")
                const nftMetadata = {
                    name: "PokemonNFTBattle2 Code Block",
                    description: "This NFT represents ownership of this Code Block as an PokemonNFTBattle2 IP",
                    image: "https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png",
                }
                console.log("done")
                const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
                const ipHash = createHash("sha256").update(ipIpfsHash).digest("hex")
                console.log("done")
                const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
                const nftHash = createHash("sha256").update(nftIpfsHash).digest("hex")

                console.log(`Generating Parent IP`)
                console.log("0x57b8e223Cd397B8334ff37a2FA0F513DdB57E498" as Address)
                console.log(CurrencyAddress)
                console.log(`IP Hash:`,ipHash)
                console.log(`NFT Hash:`,nftHash)
                const IPAresponse = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
                    nftContract: "0x57b8e223Cd397B8334ff37a2FA0F513DdB57E498" as Address,
                    derivData: {
                        parentIpIds: [parentID],
                        licenseTermsIds: ["161"],
                    },
                    ipMetadata: {
                        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
                        ipMetadataHash: `0x${ipHash}`,
                        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
                        nftMetadataHash: `0x${nftHash}`,
                    },
                    txOptions: { waitForTransaction: true }
                })

                
                console.log(
                    `Deriv IPA created at transaction hash ${IPAresponse.txHash}, IPA ID: ${IPAresponse.childIpId}`
                )
                console.log(
                    `View on the explorer: https://explorer.story.foundation/ipa/${IPAresponse.childIpId}`
                )

                const AttachResponse = await client.license.attachLicenseTerms({
                    ipId: IPAresponse.childIpId as Address,
                    licenseTemplate: "0x8BB1ADE72E21090Fc891e1d4b88AC5E57b27cB31",
                    licenseTermsId: "161",
                    txOptions: { waitForTransaction: true }
                });
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

export default DerivativeIPAComponent