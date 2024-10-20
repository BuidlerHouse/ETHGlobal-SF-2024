import { Notification, NotificationType } from "./notificationContext"

interface NotificationListProps {
    notifications: Notification[]
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
    return (
        <div className="fixed bottom-5 right-1/2 -translate-y-1/2 z-[10000] bg-black">
            {notifications.map(({ id, text, type }) => (
                <NotificationItem key={id} text={text} type={type} />
            ))}
        </div>
    )
}

interface NotificationItemProps {
    text: string
    type: NotificationType
}

const NotificationItem: React.FC<NotificationItemProps> = ({ text, type }) => {
    const getIcon = () => {
        switch (type) {
            case "info":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                )
            case "success":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                )
            case "error":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                )
        }
    }

    const getAlertClass = () => {
        switch (type) {
            case "info":
                return "alert-info"
            case "success":
                return "alert-success"
            case "error":
                return "alert-error"
            default:
                return ""
        }
    }

    return (
        <div role="alert" className=" bg-black ">
            {getIcon()}
            <span className="text-white">{text}</span>
        </div>
    )
}
