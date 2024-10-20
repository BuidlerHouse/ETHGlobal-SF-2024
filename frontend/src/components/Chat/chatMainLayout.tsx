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

        if (input.includes("onramp")) {
            setTimeout(() => {
                setCode([
                    `function PokemonNFTBattle() {
  const [hasMinted, setHasMinted] = useState(false);

  const opponentNFT = {
    name: 'Pikachu',
    description: 'An electric-type Pokémon known for its speed and electric attacks.',
    image: 'https://artefarm.s3.ap-southeast-1.amazonaws.com/hackathon/pikachu.jpg',
  };

  const generatedNFT = {
    name: 'Charizard',
    description: 'A fire-type Pokémon that has a flame at the tip of its tail.',
    image: 'https://artefarm.s3.ap-southeast-1.amazonaws.com/hackathon/Charizard.jpg',
  };

  const handleMint = () => {
    setHasMinted(true);
    alert('Your NFT has been minted! Get ready to battle!');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Top section with red background */}
      <div
        style={{
          backgroundColor: 'red',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1, // Takes up 50% of the viewport height
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Pokémon NFT Battle
        </h1>

        {/* Opponent's NFT */}
        <div
          style={{
            width: '200px',
            height: '300px',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            padding: '1rem',
            marginBottom: '2rem',
          }}
        >
          <h3>{opponentNFT.name}</h3>
          <img
            src={opponentNFT.image}
            alt={opponentNFT.name}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '0.5rem',
            }}
          />
          <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>
            {opponentNFT.description}
          </p>
        </div>
      </div>

      {/* Bottom section with blue background */}
      <div
        style={{
          backgroundColor: 'blue',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1, // Takes up 50% of the viewport height
        }}
      >
        {/* Your mintable NFT card (dashed outline before minting) */}
        <div
          style={{
            width: '300px',
            height: '400px',
            border: hasMinted ? 'none' : '2px dashed #ccc',
            backgroundColor: hasMinted ? '#fff' : 'transparent',
            borderRadius: '1rem',
            boxShadow: hasMinted ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
            textAlign: 'center',
            padding: '1rem',
            position: 'relative',
          }}
        >
          {hasMinted ? (
            <>
              <h3>{generatedNFT.name}</h3>
              <img
                src={generatedNFT.image}
                alt={generatedNFT.name}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
              <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                {generatedNFT.description}
              </p>
            </>
          ) : (<>
            <p style={{ fontSize: '1.25rem', color: '#aaa', marginTop: '50%' }}>
              Mint your NFT to start battling!
            </p> {/* Mint Button */}
        {!hasMinted && (
          <a
            href="https://onramp-sandbox.gatefi.com/?merchantId=3f68e9a6-5886-4d24-bb3b-b075033d51c1&cryptoCurrency=eth&cryptoAmount=0.1&cryptoAmountLock=True&cryptoCurrencyLock=True&fiatCurrency=USD&fiatCurrencyLock=True&wallet=0xe5107dee9CcC8054210FF6129cE15Eaa5bbcB1c0"
            style={{
              backgroundColor: '#ffcc00',
              color: '#000',
              padding: '0.75rem 1.5rem',
              fontSize: '1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              marginTop: '2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Buy NFT with USD
          </a>
        )}
            </>
          )}
        </div>

       
      </div>
    </div>
  );
}`,
                ])
                setMessages((prev) => {
                    return [
                        ...prev.slice(0, -1),
                        {
                            content: "You are onramp now.",
                            role: "assistant",
                            status: "delivered",
                        },
                    ]
                })
            }, 1000)
        }

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
