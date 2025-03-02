import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import CrowdfundingABI from '../contracts/CrowdfundingABI.json';

let web3: Web3;
let crowdfundingContract: any;
let currentAccount: string | null = null;

export const initWeb3 = async () => {
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      
      // Get the current account
      const accounts = await web3.eth.getAccounts();
      currentAccount = accounts[0];
      
      // Initialize the contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = (CrowdfundingABI as any).networks[networkId];
      
      if (deployedNetwork) {
        crowdfundingContract = new web3.eth.Contract(
          CrowdfundingABI.abi as AbiItem[],
          deployedNetwork.address
        );
      } else {
        console.error('Contract not deployed to the current network');
      }
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        currentAccount = accounts[0];
        window.location.reload();
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      
      return { web3, contract: crowdfundingContract, account: currentAccount };
    } catch (error) {
      console.error('User denied account access', error);
      throw new Error('Please allow MetaMask access to continue.');
    }
  } else if (window.web3) {
    // Legacy dapp browsers
    web3 = new Web3(window.web3.currentProvider);
    return { web3, contract: null, account: null };
  } else {
    throw new Error('No Ethereum browser extension detected. Please install MetaMask.');
  }
};

export const getCurrentAccount = () => currentAccount;

export const createProject = async (
  title: string,
  description: string,
  imageUrl: string,
  fundingGoal: string,
  durationInDays: string
) => {
  if (!crowdfundingContract || !currentAccount) {
    throw new Error('Web3 not initialized');
  }
  
  const fundingGoalWei = web3.utils.toWei(fundingGoal, 'ether');
  
  return crowdfundingContract.methods
    .createProject(title, description, imageUrl, fundingGoalWei, durationInDays)
    .send({ from: currentAccount });
};

export const fundProject = async (projectId: number, amount: string) => {
  if (!crowdfundingContract || !currentAccount) {
    throw new Error('Web3 not initialized');
  }
  
  const amountWei = web3.utils.toWei(amount, 'ether');
  
  return crowdfundingContract.methods
    .fundProject(projectId)
    .send({ from: currentAccount, value: amountWei });
};

export const withdrawFunds = async (projectId: number) => {
  if (!crowdfundingContract || !currentAccount) {
    throw new Error('Web3 not initialized');
  }
  
  return crowdfundingContract.methods
    .withdrawFunds(projectId)
    .send({ from: currentAccount });
};

export const claimRefund = async (projectId: number) => {
  if (!crowdfundingContract || !currentAccount) {
    throw new Error('Web3 not initialized');
  }
  
  return crowdfundingContract.methods
    .claimRefund(projectId)
    .send({ from: currentAccount });
};

export const getProject = async (projectId: number) => {
  if (!crowdfundingContract) {
    throw new Error('Web3 not initialized');
  }
  
  const project = await crowdfundingContract.methods.getProject(projectId).call();
  
  return {
    id: parseInt(project.id),
    creator: project.creator,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    fundingGoal: web3.utils.fromWei(project.fundingGoal, 'ether'),
    amountRaised: web3.utils.fromWei(project.amountRaised, 'ether'),
    deadline: new Date(parseInt(project.deadline) * 1000),
    completed: project.completed,
    funded: project.funded
  };
};

export const getProjectCount = async () => {
  if (!crowdfundingContract) {
    throw new Error('Web3 not initialized');
  }
  
  return parseInt(await crowdfundingContract.methods.projectCount().call());
};

export const getContribution = async (projectId: number, contributor: string) => {
  if (!crowdfundingContract) {
    throw new Error('Web3 not initialized');
  }
  
  const contribution = await crowdfundingContract.methods
    .getContribution(projectId, contributor)
    .call();
  
  return web3.utils.fromWei(contribution, 'ether');
};

export const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isDeadlinePassed = (deadline: Date) => {
  return new Date() > deadline;
};

export const calculateFundingProgress = (amountRaised: string, fundingGoal: string) => {
  const raised = parseFloat(amountRaised);
  const goal = parseFloat(fundingGoal);
  
  if (goal === 0) return 0;
  
  return Math.min((raised / goal) * 100, 100);
};

// Add this to the window object for TypeScript
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}