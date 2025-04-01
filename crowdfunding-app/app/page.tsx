'use client';

import { useEffect, useState } from 'react';
import { useWeb3 } from './context/Web3Context';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  fundingGoal: string;
  currentFunding: string;
  deadline: number;
  imageUrl: string;
  category: string;
  creator: string;
  isFunded: boolean;
  isExpired: boolean;
}

export default function Home() {
  const { contract, account, formatEther } = useWeb3();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [contract]);

  const fetchProjects = async () => {
    if (!contract) return;

    try {
      const projectsData = await contract.getProjects();
      const formattedProjects = projectsData.map((project: any) => ({
        id: project.id.toNumber(),
        title: project.title,
        description: project.description,
        fundingGoal: formatEther(project.fundingGoal),
        currentFunding: formatEther(project.currentFunding),
        deadline: project.deadline.toNumber(),
        imageUrl: project.imageUrl,
        category: project.category,
        creator: project.creator,
        isFunded: project.isFunded,
        isExpired: project.isExpired,
      }));
      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-100 to-pink-200 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-900 mb-6"
          >
            Fund Your Dreams with Crypto! 🌟
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-purple-800 mb-8 max-w-3xl mx-auto"
          >
            Join the future of crowdfunding with our decentralized platform. Create, fund, and support amazing projects! 🚀
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {!account ? (
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.ethereum) {
                    window.ethereum.request({ method: 'eth_requestAccounts' });
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Connect Wallet 🔗
              </button>
            ) : (
              <Link
                href="/create"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Project ✨
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-purple-900 mb-8 text-center"
          >
            Featured Projects 🌟
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 border border-purple-100"
              >
                <div className="relative h-48">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.isFunded && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Funded ✅
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">{project.title}</h3>
                  <p className="text-purple-700 mb-4 line-clamp-2">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Goal:</span>
                      <span className="font-medium text-purple-900">{project.fundingGoal} ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Raised:</span>
                      <span className="font-medium text-purple-600">{project.currentFunding} ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Deadline:</span>
                      <span className="font-medium text-purple-900">
                        {new Date(project.deadline * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/project/${project.id}`}
                    className="mt-4 block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    View Details 👀
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 