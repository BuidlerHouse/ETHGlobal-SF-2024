export const dynamic = "force-dynamic"
import { User } from "../../../../library/auth"
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
                        content: "you are a code helper, you are going to help me with the code below. you should follow the rules below: 1. always return the correct value and type. 2. never change the overall structure of the code and never add or import any packages. 3. only change the specific lines or sections mentioned 4. this should definitely be a correct function 5. you should never return anything after return the code 6. return the code in the code box and always wrap with ``` and ``` 7. you should always say I have finish adding, editing something",
                    },
                ],
                max_tokens: 8192,
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
