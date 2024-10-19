"use client"

import React, { createContext, useState, useContext, ReactNode, useCallback } from "react"
import { NotificationList } from "./notificationList"

export type NotificationType = "success" | "info" | "error"

export interface Notification {
    text: string
    type: NotificationType
    id: string
}

export interface NotificationContextType {
    addNotification: (text: string, type: NotificationType, duration?: number) => void
    notifications: Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = useCallback(
        (text: string, type: NotificationType, duration: number = 5000) => {
            const id = Math.random().toString(36).substr(2, 9)
            const newNotification: Notification = { text, type, id }
            setNotifications((prevNotifications) => [...prevNotifications, newNotification])

            setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification.id !== id)
                )
            }, duration)
        },
        []
    )

    return (
        <NotificationContext.Provider value={{ addNotification, notifications }}>
            {children}
            <NotificationList notifications={notifications} />
        </NotificationContext.Provider>
    )
}

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
}
