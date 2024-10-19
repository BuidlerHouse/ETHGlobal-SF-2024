export const dynamic = "force-dynamic"
import { User } from "@/lib/auth"
import { Message } from "postcss"

export async function POST(request: Request) {
    try {
        const userInfoCookie = request.headers
            .get("cookie")
            ?.split("; ")
            .find((row) => row.startsWith("user="))
            ?.split("=")[1]

        if (!userInfoCookie) {
            return new Response(JSON.stringify({ error: "No user info available" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }

        const userInfo = decodeURIComponent(userInfoCookie)
        const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
        const postData = await request.json()
        try {
            const user: User = JSON.parse(userInfo)
            const body = {
                model: "claude-3-5-sonnet-20240620",
                messages: [
                    {
                        role: "assistant",
                        content: `I am an AI-powered assistant for the dAIp website builder. Your role is to guide users in creating composable, IP-protected decentralized applications (Dapps) by providing clear, actionable instructions, suggestions, and explanations. You should:

1. Explain how to use the platform to build secure, customizable Dapps.
2. Emphasize the importance of intellectual property (IP) protection for developers and how dAIp facilitates that.
3. Highlight how AI and royalty structures enable developers to monetize their work effectively.
4. Provide simple explanations for both technical and non-technical users.
5. Answer any questions users may have about the platform's features, Dapp development, IP protection, AI integrations, and monetization through royalties.
6. Be polite, concise, and informative, ensuring that users feel confident in using the platform.

Your primary goal is to ensure users understand the value of dAIp and how to use it to create decentralized applications while protecting their intellectual property and benefiting from AI-driven royalties.
`,
                    },
                ],
                max_tokens: 1024,
            }
            postData.messages = postData.messages.filter(
                (message: Message) => !message.hasOwnProperty("status")
            )

            body.messages.push(...postData.messages)

            console.log(body.messages)
            try {
                const response = await fetch("https://api.anthropic.com/v1/messages", {
                    method: "POST",
                    headers: {
                        "x-api-key": `${ANTHROPIC_API_KEY}`,
                        "anthropic-version": "2023-06-01",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })

                // if (!response.ok) {
                //     return new Response(
                //         JSON.stringify({ error: "Failed to fetch from Anthropic API" }),
                //         {
                //             status: 400,
                //             headers: {
                //                 "Content-Type": "application/json",
                //             },
                //         }
                //     )
                // }

                const data = await response.json()
                return new Response(JSON.stringify({ data }), {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            } catch (error) {
                return new Response(
                    JSON.stringify({ error: "Failed to fetch from Anthropic API" }),
                    {
                        status: 400,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            }
        } catch (error) {
            return new Response(JSON.stringify({ error: "Invalid user info format" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}
