"use client"
import { useUser } from "@/context/userContext"
import React, { useState } from "react"

type MessageTypes = {
    content: string
    role: "user" | "assistant"
    status?: "pending" | "sent" | "delivered" | "read"
}

const ChatMainLayout: React.FC = () => {
    const { openChat, setOpenChat } = useUser()
    const [messages, setMessages] = useState<MessageTypes[]>([])
    const [input, setInput] = useState<string>("")

    const handleSend = () => {
        if (input.trim()) {
            setMessages((prev) => {
                return [...prev, { content: input, role: "user", status: "sent" }]
            })
            setInput("")
        }
        const userToken = localStorage.getItem("dynamic_authentication_token")
        if (!userToken) {
            return null
        }
        setMessages((prev) => {
            return [...prev, { content: "", role: "assistant", status: "pending" }]
        })
        fetch("/api/func/get/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(userToken)}`,
            },
            body: JSON.stringify({
                messages: [...messages, { content: input, role: "user" }],
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages((prev) => {
                    return [
                        ...prev.slice(0, -1),
                        {
                            content: data.data.content[0].text,
                            role: "assistant",
                            status: "delivered",
                        },
                    ]
                })
            })
    }

    return (
        <>
            {openChat && (
                <div
                    className="fixed z-100 gap-2 left-5 bottom-5 w-[200px] h-[500px] flex flex-col justify-end"
                    style={{
                        padding: "6px",
                        border: "5px solid #000",
                        width: "300px",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            overflowY: "scroll",
                            border: "1px solid #000",
                            padding: "10px",
                        }}
                    >
                        {messages.map((msg, index) => {
                            if (msg.role === "assistant") {
                                return (
                                    <div key={index} style={{ marginBottom: "5px" }}>
                                        <strong>dAIp:</strong>{" "}
                                        {msg.status === "pending" ? "thinking..." : msg.content}
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} style={{ marginBottom: "5px" }}>
                                        <strong>You:</strong> {msg.content}
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="flex justify-between gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                width: "100%",
                                border: "1px solid #000",
                                padding: "5px",
                            }}
                        />
                        <button
                            onClick={handleSend}
                            className="border-[1px] border-black p-[5px] hover:bg-slate-100 w-[50px]"
                        >
                            Send
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setOpenChat(false)
                        }}
                        className="btn btn-square btn-outline absolute -right-[60px] -bottom-[5px]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
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
                </div>
            )}
        </>
    )
}

export default ChatMainLayout
