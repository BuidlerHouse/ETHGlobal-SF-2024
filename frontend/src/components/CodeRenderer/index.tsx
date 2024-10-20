import { useUser } from "@/context/userContext"
import React, { useState } from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

const CodeEditor: React.FC = () => {
    const { code, setCode } = useUser()
    const [show, setShow] = useState<"code" | "UI" | "">("UI")

    const handleCodeChange = (newCode: string, index: number) => {
        setCode((prev) => {
            const newCodeArr = [...prev]
            newCodeArr[index] = newCode
            return newCodeArr
        })
    }

    const toggleShow = (view: "code" | "UI") => {
        setShow(view === show ? "" : view)
    }

    return (
        <div className="w-screen h-full">
            {code.map((c, i) => (
                <LiveProvider code={c} language="typescript" scope={{ useState }} key={i}>
                    <div className="flex gap-0 justify-between mb-4">
                        <button
                            className="p-2 bg-blue-500 text-white rounded"
                            onClick={() => toggleShow("UI")}
                        >
                            {show === "UI" ? "收纳 UI" : "展开 UI"}
                        </button>
                        <button
                            className="p-2 bg-blue-500 text-white rounded"
                            onClick={() => toggleShow("code")}
                        >
                            {show === "code" ? "收纳 Code" : "展开 Code"}
                        </button>
                    </div>
                    <div className="flex gap-0 justify-between">
                        {show !== "UI" && (
                            <div className="w-full max-h-screen overflow-scroll">
                                <LivePreview />
                            </div>
                        )}
                        {show !== "code" && (
                            <div className="w-full max-h-screen overflow-scroll">
                                <LiveEditor
                                    onChange={(newCode) => {
                                        handleCodeChange(newCode, i)
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <LiveError />
                </LiveProvider>
            ))}
        </div>
    )
}

export default CodeEditor
