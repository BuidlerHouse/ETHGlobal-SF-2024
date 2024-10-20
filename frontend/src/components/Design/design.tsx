"use client"
import { useNotification } from "@/context/notificationContext"
import { useUser } from "@/context/userContext"
import React, { useState } from "react"
import CodeEditor from "../CodeRenderer"
import ChatMainLayout from "../Chat/chatMainLayout"

const Design: React.FC = () => {
    const { authorized, code, openChat, setOpenChat } = useUser()
    const { addNotification } = useNotification()

    return (
        <>
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
            {code && <ChatMainLayout />}
            {code && (
                <div>
                    <CodeEditor />
                </div>
            )}
        </>
    )
}

export default Design
