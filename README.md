# dAIp

![Logo](./docs/logo.png)

## Introduction

**dAIp: AI-enhanced Dapp Creation, Unlocking Web3's Full Potential**

dAIp is a website builder for creating composable, IP-protected Dapps, empowering builders' monetization through AI and royalties.

Creating fully functioning Dapps is costly and complex, limiting adoption despite growing blockchain infrastructure. dAIp aims to solve this by leveraging AI to simplify the Dapp creation process, reducing technical barriers and costs. Our platform empowers teams of all sizes to customize Dapp templates effortlessly, fostering more real-world Web3 use cases. dAIp also addresses the IP of AI-generated creations, incorporating royalty systems, group collaboration, and a dispute resolution module, ensuring creators' rights and fair distribution of rewards.

## Features

Key Functions of dAIp:

**AI-Driven Template Modification**: Users can easily modify existing templates by communicating their desired changes to the AI, which will generate updated Dapp designs in real time.

**IP Protection via NFTs**: Once a user customizes a template, it can be registered as an NFT, serving as a verifiable record of intellectual property ownership.

**IP Dispute Resolution**: A decentralized system to handle any IP disputes within the ecosystem, ensuring fairness and protection of creator rights.

**Royalty Distribution**: dAIp enables creators to embed royalty mechanisms directly into their templates, allowing them to earn from future use and iterations of their work.

**Grouping of Templates**: Multiple templates can be grouped together to create complex Dapps, enabling seamless collaboration across different functionalities.

## Bounty Writeup

### Phala-Network

Code: 

dAIp's backend is powered by Phala Network, leveraging its Trusted Execution Environment (TEE) for secure and confidential computation.
```bash
cd backend
docker-compose up 
```

View the API at http://0.0.0.0:9001/core/tee/

### Near Protocol

User owned AI is Near
Bring AI and Web3 together to enable a user-owned internet that guarantees privacy and ownership of data and assets, where everyone can be a builder. Some ideas to explore:
* Build autonomous agents and explore their on-chain interaction on Near

Code path: backend/dAIp/contracts/near/README.md
Smart contract on testnet: daip.prelaunch.testnet
https://explorer.testnet.near.org/transactions/5DPew78Fk5pGmXXofXc3SugBvrGejQqHXg1hnnPcC8Dj

1. Chat:
https://explorer.testnet.near.org/transactions/2b9KTxb8z5oGrbmbsQgQVrGya7mCY2y87ysrVXQfaBxz

2. Reply by anonymous service provider:
https://explorer.testnet.near.org/transactions/B3P4RSF3VPGnE4siNbbf8rhiRmynq1MEiAjGx9R1n32y

Takeaway:
We find a bug while functionCall()

```bash
Scheduling a call: daip.prelaunch.testnet.new()
Doing account.functionCall()
Receipt: FA8Xa2f6QdR97R8vPctShyazuYHquoyJZMa8HsMDnBtj
        Failure [daip.prelaunch.testnet]: Error: Error happened while deserializing the module
ServerTransactionError: Error happened while deserializing the module
    at Object.parseResultError (/usr/local/lib/node_modules/near-cli/node_modules/near-api-js/lib/utils/rpc_errors.js:31:29)
    at Account.signAndSendTransactionV2 (/usr/local/lib/node_modules/near-cli/node_modules/near-api-js/lib/account.js:160:36)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async scheduleFunctionCall (/usr/local/lib/node_modules/near-cli/commands/call.js:57:38)
    at async Object.handler (/usr/local/lib/node_modules/near-cli/utils/exit-on-error.js:52:9) {
  type: 'Deserialization',
  context: undefined,
```

Debug contract compilation: set rustup to 1.77, higher version maybe cause deseralization error.

### Walrus

dAIp leverages Walrus to securely upload and store files on its decentralized network, linking them to SUI objects. This empowers users to interact with SUI objects for future transactions, dApps customization, and asset representation in a seamless, verifiable manner, ultimately catalyzing innovative solutions in the community.

- Code path: backend/core/walrus_upload.py    
- References: https://github.com/MystenLabs/walrus-docs/tree/main/examples
- CodeBlock Metadata Storage: https://testnet.suivision.xyz/object/0x12fabab08a72acd508ebbfa1ab4f6379777c6fa2d7c4c4438e1f8a158883d9c5
