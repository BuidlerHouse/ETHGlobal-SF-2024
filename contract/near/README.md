# Anonymous AI Agent Onchain Interface Based on NEAR

This contract used by dAIp implements an anonymous AI agent onchain interface using the NEAR blockchain. 
It provides a decentralized and privacy-preserving way for users to interact with AI agents through smart contracts.

## Features

- Anonymous interactions with AI agents
- Onchain storage of conversations
- Pay-per-token model for AI responses
- Refund mechanism for unused tokens
- Owner-controlled pricing and response length limits

## Smart Contract Functions

- `chat`: Send a message to the AI agent
- `reply`: Allow the contract owner to respond as the AI agent
- `set_price_per_token`: Set the price per token for AI responses

## Getting Started

1. Deploy the smart contract to a NEAR account
2. Initialize the contract with desired parameters
3. Users can start interacting with the AI agent using the `chat` function

For more details on implementation and usage, refer to the source code and comments in `src/lib.rs`.