import CrowdfundingABI from "./CrowdfundingABI.json";

const config = {
  abi: CrowdfundingABI,
  address: {
    1337: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x487A36A9d8500c2B68a683906228693E85878734",
  },
};

console.log("Contract Address:", config.address[1337]);

export default config;