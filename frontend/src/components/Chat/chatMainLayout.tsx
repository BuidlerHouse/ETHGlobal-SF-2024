"use client"
import { useUser } from "@/context/userContext"
import React, { useState } from "react"

type MessageTypes = {
    content: string
    role: "user" | "assistant"
    status?: "pending" | "sent" | "delivered" | "read"
}

const ChatMainLayout: React.FC = () => {
    const { openChat, setOpenChat, code, setCode } = useUser()
    const [messages, setMessages] = useState<MessageTypes[]>([])
    const [input, setInput] = useState<string>("")

    function extractCodeAndText(response: string): { code: string; text: string } {
        // Define the regular expression to find the code block (multiline supported)
        const codeRegex = /```[\s\S]*?```/g
        console.log("response", response)

        // Initialize variables to store the extracted code and text
        let code = ""
        let text = response

        // Find and process all code blocks
        const codes = response.match(codeRegex)
        if (codes) {
            code = codes
                .map((c) => {
                    // Ensure c is a string before applying .trim()
                    const cleanCode = c
                        .replace(/```(typescript|javascript|jsx|html|css)?/g, "")
                        .replace(/```/g, "")
                    return typeof cleanCode === "string" ? cleanCode.trim() : ""
                })
                .join("\n\n")
            text = response.replace(codeRegex, "").trim() // Replace all code blocks with empty strings
        }

        // Clean up the text by trimming extra whitespace and common code intro text
        text = text
            .replace("Here's the modified code:", "")
            .replace("Here's the updated code:", "")
            .replace("Here's the corrected code:", "")
            .replace("Here's the fixed code:", "")
            .replace("Here's the code with the changes:", "")
            .replace("Here's the code with the corrections:", "")
            .replace("Here's the code with the modifications:", "")
            .replace("Here's the code with the edits:", "")
            .replace("Here's the code with the updates:", "")
            .replace("Here's the code with the amendments:", "")
            .replace("Here's the code with the revisions:", "")
            .replace("Here's the code with the alterations:", "")
            .replace("Here's the code with the modifications:", "")
            .trim()

        console.log("code", code)
        console.log("text", text)

        // Return an object containing both the code and the remaining text
        return { code, text }
    }

    const handleSend = () => {
        if (!code) return
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
                messages: [
                    ...messages,
                    { content: input, role: "user" },
                    { content: code[0], role: "user" },
                ],
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const { code, text } = extractCodeAndText(data.data.content[0].text)
                setCode([code])
                setMessages((prev) => {
                    return [
                        ...prev.slice(0, -1),
                        {
                            content: text,
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
                    className="fixed z-100 gap-2 right-5 bottom-5 w-[200px] h-[500px] flex flex-col justify-end bg-black"
                    style={{
                        padding: "6px",
                        border: "5px solid #fff",
                        width: "300px",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            overflowY: "scroll",
                            border: "1px solid #fff",
                            padding: "10px",
                            background: "white",
                        }}
                    >
                        {messages.map((msg, index) => {
                            if (msg.role === "assistant") {
                                return (
                                    <div
                                        key={index}
                                        style={{ marginBottom: "5px", color: "black" }}
                                    >
                                        <strong>dAIp:</strong>{" "}
                                        {msg.status === "pending" ? "thinking..." : msg.content}
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        key={index}
                                        style={{ marginBottom: "5px", color: "black" }}
                                    >
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
                                border: "1px solid #fff",
                                padding: "5px",
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend()
                                }
                            }}
                        />
                        <button
                            onClick={handleSend}
                            className="border-[1px] bg-white border-white p-[5px] hover:bg-slate-100 w-[50px]"
                        >
                            Send
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setOpenChat(false)
                        }}
                        className="btn btn-square btn-outline absolute -left-[60px] bg-white -bottom-[5px]"
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
