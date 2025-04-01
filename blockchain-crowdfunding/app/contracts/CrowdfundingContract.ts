import { ethers } from 'ethers';
import { Project, Backer } from '../types';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  'function createProject(string title, string description, uint256 fundingGoal, uint256 deadline, string imageUrl, string category) public returns (uint256)',
  'function getProjects() public view returns (tuple(uint256 id, string title, string description, uint256 fundingGoal, uint256 currentFunding, uint256 deadline, string imageUrl, string category, address creator, bool isFunded, bool isExpired)[])',
  'function getProject(uint256 projectId) public view returns (tuple(uint256 id, string title, string description, uint256 fundingGoal, uint256 currentFunding, uint256 deadline, string imageUrl, string category, address creator, bool isFunded, bool isExpired))',
  'function fundProject(uint256 projectId) public payable',
  'function withdrawFunds(uint256 projectId) public',
  'function deleteProject(uint256 projectId) public',
  'function getBackers(uint256 projectId) public view returns (tuple(address address, uint256 amount, uint256 timestamp)[])',
  'function isProjectCreator(uint256 projectId) public view returns (bool)',
  'function isProjectBacker(uint256 projectId) public view returns (bool)',
];

export class CrowdfundingContract {
  private contract: ethers.Contract;

  constructor(signer: ethers.Signer) {
    if (!CONTRACT_ADDRESS) {
      throw new Error('Contract address not found in environment variables');
    }
    console.log('Initializing CrowdfundingContract with:');
    console.log('Contract Address:', CONTRACT_ADDRESS);
    console.log('Signer:', signer);
    
    try {
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      console.log('Contract initialized successfully');
    } catch (error) {
      console.error('Failed to initialize contract:', error);
      throw error;
    }
  }

  async createProject(
    title: string,
    description: string,
    fundingGoal: ethers.BigNumber,
    deadline: number,
    imageUrl: string,
    category: string
  ): Promise<ethers.ContractTransaction> {
    try {
      console.log('Creating project with:', {
        title,
        description,
        fundingGoal: fundingGoal.toString(),
        deadline,
        imageUrl,
        category
      });
      
      // Verify contract exists
      const code = await this.contract.provider.getCode(this.contract.address);
      if (code === '0x') {
        throw new Error('No contract found at the specified address');
      }

      // Verify signer
      const signerAddress = await this.contract.signer.getAddress();
      console.log('Creating project with signer:', signerAddress);

      const tx = await this.contract.createProject(
        title,
        description,
        fundingGoal,
        deadline,
        imageUrl,
        category
      );
      
      console.log('Transaction sent:', tx.hash);
      return tx;
    } catch (error: any) {
      console.error('Error creating project:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        data: error.data,
        transaction: error.transaction,
        contractAddress: this.contract.address
      });
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      console.log('Attempting to get projects...');
      console.log('Contract instance:', this.contract);
      console.log('Contract address:', this.contract.address);
      
      // Verify contract exists at address
      const code = await this.contract.provider.getCode(this.contract.address);
      if (code === '0x') {
        throw new Error('No contract found at the specified address');
      }
      
      const projects = await this.contract.getProjects();
      console.log('Raw projects data:', projects);
      
      if (!projects || projects.length === 0) {
        console.log('No projects found');
        return [];
      }
      
      return projects.map((project: any) => {
        console.log('Processing project:', project);
        return {
          id: project.id || ethers.BigNumber.from(0),
          title: project.title || '',
          description: project.description || '',
          fundingGoal: project.fundingGoal || ethers.BigNumber.from(0),
          currentFunding: project.currentFunding || ethers.BigNumber.from(0),
          deadline: project.deadline || ethers.BigNumber.from(0),
          imageUrl: project.imageUrl || '',
          category: project.category || '',
          creator: project.creator || '',
          isFunded: project.isFunded || false,
          isExpired: project.isExpired || false,
        };
      });
    } catch (error: any) {
      console.error('Error in getProjects:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        data: error.data,
        transaction: error.transaction,
        contractAddress: this.contract.address
      });
      throw error;
    }
  }

  async getProject(projectId: number): Promise<Project> {
    const project = await this.contract.getProject(projectId);
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      fundingGoal: project.fundingGoal,
      currentFunding: project.currentFunding,
      deadline: project.deadline,
      imageUrl: project.imageUrl,
      category: project.category,
      creator: project.creator,
      isFunded: project.isFunded,
      isExpired: project.isExpired,
    };
  }

  async fundProject(projectId: number, amount: ethers.BigNumber): Promise<void> {
    const tx = await this.contract.fundProject(projectId, { value: amount });
    await tx.wait();
  }

  async withdrawFunds(projectId: number): Promise<void> {
    const tx = await this.contract.withdrawFunds(projectId);
    await tx.wait();
  }

  async deleteProject(projectId: number): Promise<void> {
    const tx = await this.contract.deleteProject(projectId);
    await tx.wait();
  }

  async getBackers(projectId: number): Promise<Backer[]> {
    const backers = await this.contract.getBackers(projectId);
    return backers.map((backer: any) => ({
      address: backer.address,
      amount: backer.amount,
      timestamp: backer.timestamp,
    }));
  }

  async isProjectCreator(projectId: number): Promise<boolean> {
    return await this.contract.isProjectCreator(projectId);
  }

  async isProjectBacker(projectId: number): Promise<boolean> {
    return await this.contract.isProjectBacker(projectId);
  }
} 