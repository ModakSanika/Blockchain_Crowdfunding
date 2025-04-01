# Blockchain Crowdfunding Platform

A decentralized crowdfunding platform built with Next.js, Solidity, and Web3.js. This platform allows users to create and fund projects using blockchain technology.

## Features

- Create new crowdfunding projects
- Fund existing projects
- View project details and funding status
- Track backers and funding history
- Secure transactions using MetaMask
- Real-time updates using Web3.js

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Blockchain**: Solidity, Hardhat
- **Web3**: ethers.js, Web3.js
- **Network**: Ganache (Local Blockchain)

## Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Ganache UI or CLI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blockchain-crowdfunding.git
cd blockchain-crowdfunding
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

4. Start Ganache:
- Open Ganache UI
- Create a new workspace
- Note down the RPC URL (usually http://127.0.0.1:7545)

5. Deploy the smart contract:
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

6. Update the contract address in `.env.local` with the deployed address

7. Start the development server:
```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

## MetaMask Setup

1. Add Ganache network to MetaMask:
   - Network Name: Ganache
   - RPC URL: http://127.0.0.1:7545
   - Chain ID: 1337
   - Currency Symbol: ETH

2. Import a Ganache account:
   - Open Ganache UI
   - Click on any account
   - Copy the private key
   - In MetaMask, click the account circle → Import Account → Paste the private key

## Usage

1. Connect your wallet using the "Connect Wallet" button
2. Create a new project or browse existing projects
3. Fund projects using ETH
4. Track your funded projects and manage your created projects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
