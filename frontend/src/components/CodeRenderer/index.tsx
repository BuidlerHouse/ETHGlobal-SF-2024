import { useUser } from "@/context/userContext"
import React, { useState } from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { themes } from "prism-react-renderer" // Import themes
import RegisterIPAComponent from "@/library/story/RegisterIPA"

const CollapsIcon = ({ reverse }: { reverse: boolean }) => {
    return (
        <svg
            className={reverse ? "transform rotate-180 cursor-pointer" : "cursor-pointer"}
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
            <path d="M3 19V5" />
            <path d="m13 6-6 6 6 6" />
            <path d="M7 12h14" />
        </svg>
    )
}

const CodeEditor: React.FC = () => {
    const { code, setCode } = useUser()
    const [show, setShow] = useState<"code" | "UI" | "">("")

    const handleCodeChange = (newCode: string, index: number) => {
        setCode((prev) => {
            const newCodeArr = prev ? [...prev] : []
            newCodeArr[index] = newCode
            return newCodeArr
        })
    }

    const toggleShow = (view: "code" | "UI") => {
        setShow(view === show ? "" : view)
    }

    return (
        <>
            {code && (
                <div className="w-screen h-full">
                    {code.map((c, i) => (
                        <LiveProvider
                            code={c}
                            language="typescript"
                            scope={{ useState, RegisterIPAComponent }}
                            key={i}
                        >
                            <div className="flex gap-0 justify-between mb-4 absolute top-7 w-full px-3">
                                <button
                                    className="p-2 btn bg-white text-black cursor-pointer z-[1000]"
                                    onClick={() => toggleShow("UI")}
                                >
                                    {show === "UI" ? (
                                        <CollapsIcon reverse={true} />
                                    ) : (
                                        <CollapsIcon reverse={false} />
                                    )}
                                </button>
                                <button
                                    className="p-2 btn bg-white text-black cursor-pointer z-[1000]"
                                    onClick={() => toggleShow("code")}
                                >
                                    {show === "code" ? (
                                        <CollapsIcon reverse={false} />
                                    ) : (
                                        <CollapsIcon reverse={true} />
                                    )}
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
                                            theme={themes.oceanicNext}
                                            style={{ fontSize: "12px" }}
                                        />
                                    </div>
                                )}
                            </div>
                            <LiveError />
                        </LiveProvider>
                    ))}
                </div>
            )}
        </>
    )
}

export default CodeEditor
