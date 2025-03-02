# CrowdFunding
CrowdFunding using blockchain

**🔹 1. Start Ganache**
Open Ganache (Download if not installed: Truffle Suite - Ganache)
Click "Quickstart Ethereum" to start a new workspace.
Note the RPC Server URL (Default: http://127.0.0.1:7545).

**🔹 2. Set Up MetaMask**
Open the MetaMask browser extension.
Click on the network dropdown → Select "Add Network".
Enter the following details:
Network Name: Ganache
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Currency Symbol: ETH
Save and switch to the Ganache network.

**🔹 3. Import Ganache Accounts to MetaMask**
In Ganache, copy the private key of any account.
In MetaMask, click your profile icon → Import Account.
Paste the private key → Click Import.
Now, this account has 100 ETH from Ganache.

**🔹 4. Set Up Smart Contrac**t
Open Terminal inside the crowdfunding-contracts folder.
Run the following command to install dependencies:

npm install -g truffle
Initialize a Truffle project (if not already done):

truffle init
Copy your Crowdfunding.sol contract into the contracts/ folder.
**🔹 5. Configure Truffle**
Open the truffle-config.js file.
Add the following configuration:

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,  // Ganache default port
      network_id: "*"  // Connect to any network
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
Save the file.
🔹 **6. Deploy the Smart Contract**
Create a migration file inside the migrations/ folder:


Open the file and add:


const Crowdfunding = artifacts.require("Crowdfunding");

module.exports = function(deployer) {
  deployer.deploy(Crowdfunding);
};

**Run migration to deploy the contract:**


truffle migrate --reset
Copy the contract address from the output.

**🔹 7. Connect the Frontend**
Open your React project folder.
In src/contracts/CrowdfundingABI.json, update the contract address:
json
Copy
Edit
"networks": {
  "5777": {
    "address": "YOUR_DEPLOYED_CONTRACT_ADDRESS"
  }
}

Install dependencies:
npm install

Start the React app:
npm run dev

**🔹 8. Run & Test the dApp**
Open MetaMask and ensure it's on the Ganache network.
Click "Connect Wallet" in the UI.
Create a new project and submit it.
Fund a project from another MetaMask account.
If the funding goal is reached, withdraw funds as the project creator.
If the funding goal is not reached, contributors can claim refunds.
