'use client';

import { useEffect, useState } from 'react';
import { useContract } from '../../../hooks/useContract';
import { ethers } from 'ethers';

// Define the Project type to match the smart contract structure
interface Project {
  id: number;
  title: string;
  description: string;
  creator: string;
  goalAmount: string; // Use string because BigNumber is returned as a string
  deadline: number;
  amountRaised: string; // Use string because BigNumber is returned as a string
  isActive: boolean;
}

export default function AllProjectsPage() {
  const contract = useContract();
  const [projects, setProjects] = useState<Project[]>([]); // Use the Project type

  useEffect(() => {
    const fetchProjects = async () => {
      if (!contract) return;

      try {
        const projects = await contract.getAllProjects();
        // Map the returned data to match the Project type
        const formattedProjects = projects.map((project: any) => ({
          id: project.id.toNumber(),
          title: project.title,
          description: project.description,
          creator: project.creator,
          goalAmount: project.goalAmount.toString(),
          deadline: project.deadline.toNumber(),
          amountRaised: project.amountRaised.toString(),
          isActive: project.isActive,
        }));
        setProjects(formattedProjects);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, [contract]);

  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Projects</h1>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p>{project.description}</p>
                <p>
                  <strong>Funding Goal:</strong> {ethers.utils.formatEther(project.goalAmount)} ETH
                </p>
                <p>
                  <strong>Deadline:</strong> {new Date(project.deadline * 1000).toLocaleString()}
                </p>
                <p>
                  <strong>Creator:</strong> {project.creator}
                </p>
                <p>
                  <strong>Amount Raised:</strong> {ethers.utils.formatEther(project.amountRaised)} ETH
                </p>
                <p>
                  <strong>Status:</strong> {project.isActive ? 'Active' : 'Closed'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}