"use client"
import { useUser } from "@/context/userContext"
import React from "react"

const PickingDesign: React.FC = () => {
    const { code, openChat, setOpenChat } = useUser()

    return <>{!code && <></>}</>
}

export default PickingDesign
