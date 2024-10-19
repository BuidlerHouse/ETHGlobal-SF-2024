import React from "react"

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-1 flex gap-4 w-full text-[6px] justify-center items-center">
            Copyright ©dAIp {new Date().getFullYear()}. All rights reserved.
        </footer>
    )
}

export default Footer
