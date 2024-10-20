"use client"
import { useUser } from "@/context/userContext"
import React from "react"

const PickingDesign: React.FC = () => {
    const { templateCode, setCode, setTokenId, setName, setParentId } = useUser()

    const info = {
        PokemonDerivative: {
            description:
                "A financial derivative concept based on Pokémon, integrating trading mechanics with fun.",
            tags: ["Finance", "Pokémon", "Trading"],
        },
        PokemonNFTBattle: {
            description:
                "Engage in thrilling NFT battles using unique Pokémon cards. Own, trade, and battle your way to the top.",
            tags: ["NFT", "Gaming", "Collectibles"],
        },
        TradingInterface: {
            description:
                "A sleek and efficient trading interface that offers real-time market data for cryptocurrency exchange.",
            tags: ["Cryptocurrency", "Exchange", "Markets"],
        },
        CryptoLandingPage: {
            description:
                "An elegant landing page for cryptocurrency projects, showcasing the best way to present your blockchain solution.",
            tags: ["Blockchain", "Design", "Marketing"],
        },
        teampage: {
            description:
                "A beautifully designed team page to highlight your organization's core members with style.",
            tags: ["Team", "Profiles", "Company"],
        },
        Swap: {
            description:
                "A minimal and fast cryptocurrency swap interface for converting between digital assets seamlessly.",
            tags: ["Cryptocurrency", "DeFi", "Exchange"],
        },
    }

    type TemplateNames = keyof typeof info

    const isTemplateName = (name: string): name is TemplateNames => {
        return name in info
    }

    return (
        <>
            {templateCode && (
                <div className="w-full pt-8 px-12 flex flex-wrap gap-4 justify-center">
                    {templateCode.map((temp, index) => {
                        if (!isTemplateName(temp.name)) {
                            return null
                        }

                        const templateInfo = info[temp.name]

                        return (
                            <div
                                key={index}
                                className="card bg-base-100 w-96 shadow-xl cursor-pointer hover:animate-pulse"
                                onClick={() => {
                                    if (temp.parent) {
                                        setParentId(temp.parent)
                                    }
                                    if (temp.name) {
                                        setName(temp.name)
                                    }
                                    if (temp.token_id) {
                                        setTokenId(temp.token_id)
                                    }
                                    if (temp.code) {
                                        setCode([temp.code])
                                    }
                                }}
                            >
                                <figure>
                                    <img src={`/assets/${temp.name}.png`} alt="screen" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {temp.name}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{templateInfo.description}</p>{" "}
                                    {/* Display dynamic description */}
                                    <div className="card-actions justify-end">
                                        {templateInfo.tags.map((tag, tagIndex) => (
                                            <div key={tagIndex} className="badge badge-outline">
                                                {tag}
                                            </div>
                                        ))}{" "}
                                        {/* Display dynamic tags */}
                                    </div>
                                </div>
                                <a
                                    href="https://testnet.suivision.xyz/object/0x12fabab08a72acd508ebbfa1ab4f6379777c6fa2d7c4c4438e1f8a158883d9c5"
                                    className="card-footer absolute left-1 bottom-1 text-[10px] underline"
                                >
                                    Document Hash
                                </a>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default PickingDesign
