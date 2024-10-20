"use client"
import { useUser } from "@/context/userContext"
import React, { useEffect } from "react"
import CodeEditor from "../CodeRenderer"
import ChatMainLayout from "../Chat/chatMainLayout"
import PickingDesign from "./pickingDesign"
import DerivativeIPAComponent from "@/library/story/derivativeIPA"

const Design: React.FC = () => {
    const { code, openChat, setOpenChat, setCode, setTemplateCode, tokenId, setTokenId, setName } =
        useUser()
    const getTemplateCode = async () => {
        try {
            const response = await fetch("https://daip.buidler.house/core/codeblocks/")
            const data = await response.json()
            if (data) {
                setTemplateCode(data)
                return true
            } else {
                setTemplateCode(null)
                return false
            }
        } catch (error) {
            console.error("Authentication failed:", error)
            setTemplateCode(null)
            return false
        }
    }

    useEffect(() => {
        getTemplateCode()
    }, [])

    return (
        <>
            {
                <div className="w-full h-auto bg-black text-white text-[12px] text-center fixed z-[10000]">
                    {code
                        ? "You are seeing this because you’re currently designing your page."
                        : "Choose an Blockchain widget to start designing your page."}
                </div>
            }
            {code && tokenId != "" && (
                <DerivativeIPAComponent parentID={tokenId as `0x${string}`} />
            )}
            {!openChat && (
                <>
                    {code && (
                        <button
                            onClick={() => {
                                setOpenChat(true)
                            }}
                            className="fixed btn btn-square btn-outline right-5 bottom-5 bg-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 rotate-45"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </>
            )}
            {
                <>
                    {code && (
                        <button
                            onClick={() => {
                                setCode(null)
                                setTokenId("")
                                setName("")
                            }}
                            className="fixed btn btn-square btn-outline left-5 bottom-5 bg-white z-[1000]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 15h-6v4l-7-7 7-7v4h6v6z" />
                            </svg>
                        </button>
                    )}
                </>
            }
            {code && <ChatMainLayout />}
            {code && <CodeEditor />}
            {!code && <PickingDesign />}
        </>
    )
}

export default Design
