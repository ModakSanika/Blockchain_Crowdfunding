'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

interface Web3ContextType {
  isConnected: boolean;
  signer: ethers.Signer | null;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  formatEther: (value: ethers.BigNumber) => string;
  parseEther: (value: string) => ethers.BigNumber;
}

export const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  signer: null,
  address: null,
  connect: async () => {},
  disconnect: () => {},
  formatEther: (value) => value.toString(),
  parseEther: (value) => ethers.BigNumber.from(value),
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        console.log('Checking connection...');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        console.log('Available accounts:', accounts);
        
        if (accounts.length > 0) {
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log('Connected with address:', address);
          setSigner(signer);
          setAddress(address);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          data: error.data
        });
      }
    }
  };

  const connect = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        console.log('Starting wallet connection...');
        
        // Check if MetaMask is locked
        if (!window.ethereum.selectedAddress) {
          console.log('MetaMask is locked, requesting unlock...');
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        console.log('Accounts:', accounts);

        // Create provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('Provider created');
        
        // Get network
        const network = await provider.getNetwork();
        console.log("Connected to network:", network);

        // Switch to Ganache network if needed
        if (network.chainId !== 1337) {
          console.log('Switching to Ganache network...');
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x539' }], // 1337 in hex
            });
            console.log('Successfully switched to Ganache network');
          } catch (switchError: any) {
            console.log('Network switch error:', switchError);
            // If Ganache network is not added, add it
            if (switchError.code === 4902) {
              console.log('Adding Ganache network...');
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x539',
                  chainName: 'Ganache',
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: ['http://127.0.0.1:7545'],
                  blockExplorerUrls: []
                }]
              });
              console.log('Ganache network added successfully');
            } else {
              throw switchError;
            }
          }
        }

        // Get signer and address
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("Connected with address:", address);

        setSigner(signer);
        setAddress(address);
        setIsConnected(true);

        toast.success("Wallet connected successfully");
      } catch (error: any) {
        console.error('Error connecting:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          data: error.data,
          stack: error.stack
        });
        toast.error(error.message || "Failed to connect wallet");
      }
    } else {
      toast.error("Please install MetaMask");
    }
  };

  const disconnect = () => {
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
    toast.success("Wallet disconnected");
  };

  const formatEther = (value: ethers.BigNumber) => {
    return ethers.utils.formatEther(value);
  };

  const parseEther = (value: string) => {
    return ethers.utils.parseEther(value);
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        signer,
        address,
        connect,
        disconnect,
        formatEther,
        parseEther,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
} 