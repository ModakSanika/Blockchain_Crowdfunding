import React from 'react';
import ProjectForm from '../components/ProjectForm';
import { motion } from 'framer-motion';

const CreateProjectPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create a New Project</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Launch your idea and get funded through our blockchain-based crowdfunding platform. Fill out the form below to get started.
        </p>
      </motion.div>
      
      <ProjectForm />
    </div>
  );
};

export default CreateProjectPage;