import { useUser } from "@/context/userContext"
import React, { useState } from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

const CodeEditor: React.FC = () => {
    const { code, setCode } = useUser()
    const [show, setShow] = useState<"code" | "UI">("UI")
    const handleCodeChange = (newCode: string, index: number) => {
        setCode((prev) => {
            const newCodeArr = [...prev]
            newCodeArr[index] = newCode
            return newCodeArr
        })
    }
    return (
        <div className="w-screen h-full">
            {/* <div className="flex gap-2">
                <button
                    className=""
                    onClick={() => {
                        setShow("UI")
                    }}
                >
                    UI
                </button>
                <button
                    className=""
                    onClick={() => {
                        setShow("code")
                    }}
                >
                    code
                </button>
            </div> */}
            {code.map((c, i) => (
                <LiveProvider code={c} language="typescript" scope={{ useState }} key={i}>
                    <div className="flex gap-0 justify-between">
                        <div className="w-full max-h-screen overflow-scroll">
                            <LivePreview />
                        </div>
                        <div className="w-full max-h-screen overflow-scroll">
                            <LiveEditor
                                onChange={(newCode) => {
                                    handleCodeChange(newCode, i)
                                }}
                            />
                        </div>
                    </div>
                    <LiveError />
                </LiveProvider>
            ))}
        </div>
    )
}

export default CodeEditor
