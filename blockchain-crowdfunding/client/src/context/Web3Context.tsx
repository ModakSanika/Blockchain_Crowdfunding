"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ethers } from "ethers";
import { useError } from "./ErrorContext";

const GANACHE_CONFIG = {
  RPC_URL: "http://127.0.0.1:7545",
  CHAIN_ID: 1337,
};

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<Web3ContextType, "connectWallet">>({
    account: null,
    isConnected: false,
    provider: null,
    signer: null,
    chainId: null,
  });
  const { setError } = useError();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // MetaMask is available
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Request access to accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const network = await provider.getNetwork();
        const signer = provider.getSigner();

        setState({
          account: accounts[0],
          isConnected: true,
          provider,
          signer,
          chainId: network.chainId,
        });

        console.log(`Connected to MetaMask with account: ${accounts[0]}`);
        return;
      }
      
      // If no MetaMask, try Ganache
      console.log("MetaMask not found, trying to connect to Ganache...");
      const ganacheProvider = new ethers.providers.JsonRpcProvider(GANACHE_CONFIG.RPC_URL);
      
      try {
        // Test the connection
        await ganacheProvider.getBlockNumber();
        
        const accounts = await ganacheProvider.listAccounts();
        console.log("Ganache accounts:", accounts);
        
        if (accounts.length > 0) {
          const signer = ganacheProvider.getSigner(accounts[0]);
          setState({
            account: accounts[0],
            isConnected: true,
            provider: ganacheProvider,
            signer,
            chainId: GANACHE_CONFIG.CHAIN_ID,
          });
          console.log(`Connected to Ganache with account: ${accounts[0]}`);
        } else {
          setError({
            message: "No accounts found in Ganache",
            details: "Please make sure Ganache is running with accounts configured",
            isCritical: true,
          });
        }
      } catch (error) {
        console.error("Failed to connect to Ganache:", error);
        setError({
          message: "Ganache connection failed",
          details: "Please make sure Ganache is running at " + GANACHE_CONFIG.RPC_URL,
          isCritical: true,
        });
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError({
        message: "Connection failed",
        details: err instanceof Error ? err.message : "Unknown error",
        isCritical: false,
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Check if already connected to MetaMask
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const network = await provider.getNetwork();
            const signer = provider.getSigner();
            
            setState({
              account: accounts[0],
              isConnected: true,
              provider,
              signer,
              chainId: network.chainId,
            });
            console.log("Already connected to MetaMask:", accounts[0]);
            return;
          }
        }
        
        // Try Ganache if not connected to MetaMask
        try {
          console.log("Attempting to connect to Ganache on init...");
          const ganacheProvider = new ethers.providers.JsonRpcProvider(GANACHE_CONFIG.RPC_URL);
          
          // Test the connection
          await ganacheProvider.getBlockNumber();
          
          const accounts = await ganacheProvider.listAccounts();
          console.log("Ganache accounts found on init:", accounts);
          
          if (accounts.length > 0) {
            const signer = ganacheProvider.getSigner(accounts[0]);
            setState({
              account: accounts[0],
              isConnected: true,
              provider: ganacheProvider,
              signer,
              chainId: GANACHE_CONFIG.CHAIN_ID,
            });
            console.log(`Connected to Ganache with account: ${accounts[0]}`);
          }
        } catch (error) {
          console.error("Failed to connect to Ganache during init:", error);
        }
      } catch (err) {
        console.error("Web3 initialization failed:", err);
      }
    };

    init();

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Accounts changed:", accounts);
      setState((prev) => ({
        ...prev,
        account: accounts[0] || null,
        isConnected: accounts.length > 0,
      }));
    };

    const handleChainChanged = (chainId: string) => {
      console.log("Chain changed:", chainId);
      setState((prev) => ({
        ...prev,
        chainId: parseInt(chainId, 16),
      }));
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  useEffect(() => {
    console.log("Current state - Account:", state.account);
    console.log("Current state - Chain ID:", state.chainId);
    console.log("Current state - Is Connected:", state.isConnected);
  }, [state.account, state.chainId, state.isConnected]);

  return (
    <Web3Context.Provider value={{ ...state, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}