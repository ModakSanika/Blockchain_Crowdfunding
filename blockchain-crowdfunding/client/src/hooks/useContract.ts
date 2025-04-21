import { useState, useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";
import { Contract } from "ethers";
import CrowdfundingABI from "../contracts/CrowdfundingABI.json";

export function useContract() {
  const { provider, signer } = useWeb3();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (!provider || !signer) {
        console.error("Provider or signer is not available.");
        return;
      }

      try {
        // Try to get address from environment variable first
        let contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        
        // If not available, try to get from the ABI networks
        if (!contractAddress) {
          const network = await provider.getNetwork();
          const networkId = network.chainId.toString();
          
          if (CrowdfundingABI.networks && (CrowdfundingABI.networks as Record<string, { address: string }>)[networkId]) {
            contractAddress = (CrowdfundingABI.networks as Record<string, { address: string }>)[networkId]?.address;
          }
        }

        if (!contractAddress) {
          console.error("Contract address is not available from environment or ABI.");
          return;
        }

        console.log("Initializing contract with address:", contractAddress);

        const contractInstance = new Contract(contractAddress, CrowdfundingABI.abi, signer);
        console.log("Contract instance initialized:", contractInstance);
        setContract(contractInstance);
      } catch (err) {
        console.error("Failed to initialize contract:", err);
      }
    };

    initContract();
  }, [provider, signer]);

  return contract;
}