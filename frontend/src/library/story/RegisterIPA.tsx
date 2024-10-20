"use client"
import { Address, http } from "viem"
import { uploadJSONToIPFS } from "./utils/uploadToIpfs"
import { createHash } from "crypto"
import { CurrencyAddress } from "./utils/utils"
import { useState } from "react"
import { useWalletClient } from "wagmi"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { PIL_TYPE, StoryClient, StoryConfig } from "@story-protocol/core-sdk"
import { isEthereumWallet } from "@dynamic-labs/ethereum"
import { useNotification } from "@/context/notificationContext"

// A React functional component that handles the registration logic
const RegisterIPAComponent = () => {
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

                const ipMetadata = client.ipAsset.generateIpMetadata({
                    title: "PokemonNFTBattle",
                    description: "This is a code block for PokemonNFTBattle Code IP",
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
                    name: "PokemonNFTBattle Code Block",
                    description:
                        "This NFT represents ownership of this Code Block as an PokemonNFTBattle IP",
                    image: "https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png",
                }
                console.log("done")
                const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
                const ipHash = createHash("sha256").update(ipIpfsHash).digest("hex")
                console.log("done")
                const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
                const nftHash = createHash("sha256").update(nftIpfsHash).digest("hex")

                console.log(`Generating Parent IP`)
                console.log(process.env.SPG_NFT_CONTRACT_ADDRESS as Address)
                console.log(CurrencyAddress)
                console.log(`IP Hash:`, ipHash)
                console.log(`NFT Hash:`, nftHash)
                const RootIPA = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
                    nftContract: "0x57b8e223Cd397B8334ff37a2FA0F513DdB57E498" as Address,
                    pilType: PIL_TYPE.COMMERCIAL_REMIX,
                    mintingFee: 1,
                    currency: CurrencyAddress,
                    commercialRevShare: 5,
                    ipMetadata: {
                        ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
                        ipMetadataHash: `0x${ipHash}`,
                        nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
                        nftMetadataHash: `0x${nftHash}`,
                    },
                    txOptions: { waitForTransaction: true },
                })

                addNotification(
                    `Root IPA created at transaction hash ${RootIPA.txHash}, IPA ID: ${RootIPA.ipId}, License Terms ID: ${RootIPA.licenseTermsId}`,
                    "success"
                )
                addNotification(
                    `View on the explorer: https://explorer.story.foundation/ipa/${RootIPA.ipId}`,
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
                style={{
                    backgroundColor: "#ffcc00",
                    color: "#000",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1.25rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    marginTop: "2rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                {loading ? "Mint Your Pokémon NFT..." : " Mint Your Pokémon NFT"}
            </button>
        </div>
    )
}

export default RegisterIPAComponent
