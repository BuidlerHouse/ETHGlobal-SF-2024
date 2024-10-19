"use client"
import DynamicConnectButton from "@/components/DynamicModal/walletWidget"
import { useRouter } from "next/navigation"

export default function NavBar() {
    const router = useRouter()
    return (
        <div className="navbar bg-base-100 h-auto fixed top-0 z-50 shadow-lg">
            <div className="navbar-start flex items-center">
                <div
                    className="cursor-pointer btn btn-ghost btn-sm"
                    onClick={() => {
                        router.push("/")
                    }}
                >
                    dAIp
                </div>
            </div>
            {/* <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li>
                                    <a>Submenu 1</a>
                                </li>
                                <li>
                                    <a>Submenu 2</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <a>Item 3</a>
                    </li>
                </ul>
            </div> */}
            <div className="navbar-end">
                <DynamicConnectButton />
            </div>
        </div>
    )
}
