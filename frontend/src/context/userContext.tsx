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
    code: string[]
    setCode: React.Dispatch<React.SetStateAction<string[]>>
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
})

interface UserProviderProps {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // undefined is used to indicate that the user is still being fetched
    // null is used to indicate that the user is not logged in
    const [user, setUser] = useState<UserType | null | undefined>(undefined)
    const [authorized, setAuthorized] = useState<boolean>(false)
    const [userLogging, setUserLogging] = useState<boolean>(false)
    const [openChat, setOpenChat] = useState<boolean>(false)
    const [code, setCode] = useState<string[]>([
        `
function SwapInterface() {
  const [sellAmount, setSellAmount] = useState(0);
  const [buyToken, setBuyToken] = useState('');
  const [ethBalance, setEthBalance] = useState(0.157); // Example ETH balance

  const handleSellAmountChange = (e) => {
    setSellAmount(e.target.value);
  };

  const handleTokenChange = (e) => {
    setBuyToken(e.target.value);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #ebf8ff, #faf5ff)',
        padding: '1.25rem',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginBottom: '2rem',
        }}
      >
        Exchange Anytime, Anywhere
      </h1>

      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.75rem',
          padding: '2rem',
          maxWidth: '24rem',
          width: '100%',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '1.25rem',
              color: '#4a5568',
              marginBottom: '0.5rem',
            }}
          >
            Sell
          </label>
          <input
            type="number"
            value={sellAmount}
            onChange={handleSellAmountChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              outline: 'none',
              boxShadow: '0 0 0 2px transparent',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 0 2px #9f7aea')
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = '0 0 0 2px transparent')
            }
          />
          <span
            style={{
              display: 'block',
              fontSize: '0.875rem',
              color: '#718096',
              marginTop: '0.25rem',
            }}
          >
            ETH
          </span>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#718096' }}>
            Balance: {ethBalance} ETH
          </p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '1.25rem',
              color: '#4a5568',
              marginBottom: '0.5rem',
            }}
          >
            Buy
          </label>
          <select
            value={buyToken}
            onChange={handleTokenChange}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              outline: 'none',
              boxShadow: '0 0 0 2px transparent',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 0 2px #9f7aea')
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = '0 0 0 2px transparent')
            }
          >
            <option value="">Select Token</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="USDT">Tether (USDT)</option>
            <option value="SOL">Solana (SOL)</option>
          </select>
        </div>

        <button
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#9f7aea',
            color: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#805ad5')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#9f7aea')
          }
          onFocus={(e) =>
            (e.target.style.boxShadow = '0 0 0 2px #d6bcfa')
          }
          onBlur={(e) =>
            (e.target.style.boxShadow = '0 0 0 2px transparent')
          }
        >
          Start Swap
        </button>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#718096' }}>
        The most trusted marketplace. Buy and sell tokens on multiple chains.
      </p>
    </div>
  );
}
`,
    ])
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
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
