import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getProjectCount, getProject } from '../utils/web3';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const { connected } = useWeb3();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchProjects = async () => {
      if (!connected) {
        setLoading(false);
        return;
      }
      
      try {
        const count = await getProjectCount();
        const projectsData = [];
        
        for (let i = 1; i <= count; i++) {
          const project = await getProject(i);
          projectsData.push(project);
        }
        
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [connected]);
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && !project.completed && new Date() < project.deadline;
    if (filter === 'funded') return matchesSearch && project.funded;
    if (filter === 'completed') return matchesSearch && project.completed;
    
    return matchesSearch;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through innovative projects seeking funding on our platform. Support ideas you believe in with cryptocurrency.
        </p>
      </motion.div>
      
      <motion.div 
        className="mb-8 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search projects..."
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
          >
            <option value="all">All Projects</option>
            <option value="active">Active</option>
            <option value="funded">Funded</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : !connected ? (
        <motion.div 
          className="text-center py-16 bg-gray-50 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-medium text-gray-800 mb-4">Connect your wallet to view projects</h3>
          <p className="text-gray-600">You need to connect your MetaMask wallet to interact with the blockchain</p>
        </motion.div>
      ) : filteredProjects.length === 0 ? (
        <motion.div 
          className="text-center py-16 bg-gray-50 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-medium text-gray-800 mb-4">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              fundingGoal={project.fundingGoal}
              amountRaised={project.amountRaised}
              deadline={project.deadline}
              completed={project.completed}
              funded={project.funded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;