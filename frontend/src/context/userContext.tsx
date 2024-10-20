"use client"

import { authUser } from "@/library/request"
import React, { createContext, useContext, useEffect, useState } from "react"

export type UserType = {
    id: string
    name: string
    email: string
}

const UserContext = createContext<{
    user: UserType | null | undefined
    setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>
    authorized: boolean
    logOut: () => void
    fetchUser: () => Promise<boolean>
    userLogging: boolean
    setUserLogging: React.Dispatch<React.SetStateAction<boolean>>
    openChat: boolean
    setOpenChat: React.Dispatch<React.SetStateAction<boolean>>
    code: string[] | null
    setCode: React.Dispatch<React.SetStateAction<string[] | null>>
    templateCode: DataItem[] | null
    setTemplateCode: React.Dispatch<React.SetStateAction<DataItem[] | null>>
    tokenId: string
    setTokenId: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    parentId: string
    setParentId: React.Dispatch<React.SetStateAction<string>>
}>({
    user: undefined,
    setUser: () => {},
    authorized: false,
    logOut: () => {},
    fetchUser: async () => false,
    userLogging: false,
    setUserLogging: () => {},
    openChat: false,
    setOpenChat: () => {},
    code: [],
    setCode: () => {},
    templateCode: [],
    setTemplateCode: () => {},
    tokenId: "",
    setTokenId: () => {},
    name: "",
    setName: () => {},
    parentId: "",
    setParentId: () => {},
})

interface UserProviderProps {
    children: React.ReactNode
}

export interface DataItem {
    id: number
    wallet_address: string
    parent: string | null
    code: string
    name: string
    token_id: string
    created_at: string
    updated_at: string
    parent_token_id: string
    children: any[]
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // undefined is used to indicate that the user is still being fetched
    // null is used to indicate that the user is not logged in
    const [user, setUser] = useState<UserType | null | undefined>(undefined)
    const [authorized, setAuthorized] = useState<boolean>(false)
    const [userLogging, setUserLogging] = useState<boolean>(false)
    const [openChat, setOpenChat] = useState<boolean>(false)
    const [code, setCode] = useState<string[] | null>(null)
    const [templateCode, setTemplateCode] = useState<DataItem[] | null>(null)
    const [tokenId, setTokenId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [parentId, setParentId] = useState<string>("")

    const fetchUser = async () => {
        try {
            const data = await authUser()
            if (data) {
                setUser(data.user)
                if (data.user.id) {
                    setAuthorized(true)
                    return true
                } else {
                    setUser(null)
                    setAuthorized(false)
                    return false
                }
            } else {
                setUser(null)
                setAuthorized(false)
                return false
            }
        } catch (error) {
            console.error("Authentication failed:", error)
            setUser(null)
            setAuthorized(false)
            return false
        }
    }

    const logOut = () => {
        setUser(null)
        setAuthorized(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                authorized,
                logOut,
                fetchUser,
                userLogging,
                setUserLogging,
                openChat,
                setOpenChat,
                code,
                setCode,
                templateCode,
                setTemplateCode,
                tokenId,
                setTokenId,
                name,
                setName,
                parentId,
                setParentId,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
