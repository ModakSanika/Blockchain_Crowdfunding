'use client';

import React, { useEffect, useState } from 'react';
import { formatEther } from 'ethers/lib/utils'; // Import formatEther from utils
import { useContract } from '../../hooks/useContract';
import { useRouter } from 'next/navigation';
import { useError } from '../../context/ErrorContext';

interface Project {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  raisedAmount: string;
  imageUrl: string;
  deadline: number;
  isActive: boolean;
}

export default function AllProjects() {
  const { contract } = useContract() ?? { contract: undefined };
  const { setError } = useError();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      if (!contract) {
        setError({
          message: 'Contract is not available',
          details: 'Please ensure the contract is properly initialized.',
          isCritical: true,
        });
        return;
      }

      setIsLoading(true);
      try {
        const projectCount = await contract.projectCount();
        const projectList: Project[] = [];

        for (let i = 1; i <= projectCount; i++) {
          const project = await contract.projects(i);
          projectList.push({
            id: i,
            title: project.title,
            description: project.description,
            goalAmount: formatEther(project.goalAmount),
            raisedAmount: formatEther(project.amountRaised),
            imageUrl: project.imageUrl || '/default-project.jpg',
            deadline: Number(project.deadline),
            isActive: project.isActive,
          });
        }

        setProjects(projectList);
        console.log("Fetched Projects:", projects);
      } catch (err) {
        setError({
          message: 'Failed to load projects',
          details: err instanceof Error ? err.message : String(err),
          isCritical: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [contract, setError]);

  const filteredProjects =
    activeFilter === 'active'
      ? projects.filter((project) => project.isActive)
      : projects;

  const handleViewProject = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <main className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-4 md:mb-0">
            All Projects
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-lg ${
                activeFilter === 'active'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Active Only
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-xl">No projects found</p>
            {activeFilter === 'active' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-purple-600 hover:underline"
              >
                View all projects
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-48">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-project.jpg';
                    }}
                  />
                  {!project.isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Completed
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-purple-600 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {(
                          (parseFloat(project.raisedAmount) /
                            parseFloat(project.goalAmount)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (parseFloat(project.raisedAmount) /
                              parseFloat(project.goalAmount)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewProject(project.id)}
                    className="mt-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 rounded-lg transition-colors duration-300"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}