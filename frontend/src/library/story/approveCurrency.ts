"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { iliad } from "@story-protocol/core-sdk";

const config = getDefaultConfig({
  appName: "Test Story App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [iliad],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Web3Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Contract details
const contractAddress = '0x91f6F05B08c16769d3c85867548615d270C42fC7';
const spender = '0x69415CE984A79a3Cfbe3F51024C63b6C107331e3';
const value = ethers.parseUnits('100', 18); // 100 * 10**18

// ABI for the `approve` method
const abi = defaultUSDContractAbi

// Wallet and provider setup
const privateKey = "f78e09cf521d7ecfd6511a6b081ae02fce97fde01ed6df3e7521275393af37fb";
const provider = new ethers.QuickNodeProvider(storyApiEndpoint, {
    name: 'story-testnet',
    chainId: 1513, // Story Testnet Chain ID
});
const wallet = new ethers.Wallet(privateKey, provider);

// Approve function
async function approve() {
    try {
        // Initialize the contract with ABI and wallet signer
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        // Call the `approve` method on the contract
        const tx = await contract.approve(spender, value);
        console.log('Transaction submitted:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction mined:', receipt);
    } catch (error) {
        console.error('Error during approval:', error);
    }
}

// Execute the approve function
approve();
