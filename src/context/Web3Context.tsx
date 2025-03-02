import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initWeb3, getCurrentAccount } from '../utils/web3';
import toast from 'react-hot-toast';

interface Web3ContextType {
  web3: any;
  contract: any;
  account: string | null;
  loading: boolean;
  error: string | null;
  connected: boolean;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType>({
  web3: null,
  contract: null,
  account: null,
  loading: true,
  error: null,
  connected: false,
  connectWallet: async () => {},
});

export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    web3: null,
    contract: null,
    account: null,
    loading: true,
    error: null,
    connected: false,
  });

  const connectWallet = async () => {
    setWeb3State(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { web3, contract, account } = await initWeb3();
      
      setWeb3State({
        web3,
        contract,
        account,
        loading: false,
        error: null,
        connected: !!account,
      });
      
      if (account) {
        toast.success('Wallet connected successfully!');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setWeb3State(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to connect wallet',
        connected: false,
      }));
      toast.error(error.message || 'Failed to connect wallet');
    }
  };

  useEffect(() => {
    // Check if MetaMask is already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            // User is already connected, initialize Web3
            connectWallet();
          } else {
            // User is not connected, but MetaMask is available
            setWeb3State(prev => ({
              ...prev,
              loading: false,
              connected: false,
            }));
          }
        } catch (error) {
          console.error('Error checking connection:', error);
          setWeb3State(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to check wallet connection',
            connected: false,
          }));
        }
      } else {
        // MetaMask is not available
        setWeb3State(prev => ({
          ...prev,
          loading: false,
          error: 'MetaMask not detected. Please install MetaMask to use this application.',
          connected: false,
        }));
      }
    };
    
    checkConnection();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        ...web3State,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};