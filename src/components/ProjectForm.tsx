import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { createProject } from '../utils/web3';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Upload, Clock, Target, FileText, Image } from 'lucide-react';

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { connected } = useWeb3();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    fundingGoal: '',
    duration: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    // Validate form
    if (!formData.title || !formData.description || !formData.fundingGoal || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Use a default image if none provided
    const imageUrl = formData.imageUrl || 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80';
    
    setLoading(true);
    
    try {
      await createProject(
        formData.title,
        formData.description,
        imageUrl,
        formData.fundingGoal,
        formData.duration
      );
      
      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast.error(error.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a New Project</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
            <FileText size={16} className="mr-2 text-purple-600" />
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter project title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
            <FileText size={16} className="mr-2 text-purple-600" />
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
            placeholder="Describe your project"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
            <Image size={16} className="mr-2 text-purple-600" />
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter image URL (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to use a default image</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
              <Target size={16} className="mr-2 text-purple-600" />
              Funding Goal (ETH) *
            </label>
            <input
              type="number"
              name="fundingGoal"
              value={formData.fundingGoal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 1.5"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
              <Clock size={16} className="mr-2 text-purple-600" />
              Duration (days) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 30"
              min="1"
              required
            />
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={loading || !connected}
          className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            (loading || !connected) ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload size={18} />
          <span>{loading ? 'Creating...' : 'Create Project'}</span>
        </motion.button>
        
        {!connected && (
          <p className="text-center text-red-500 mt-2 text-sm">
            Please connect your wallet to create a project
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ProjectForm;