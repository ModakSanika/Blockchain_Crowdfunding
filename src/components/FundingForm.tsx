import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { fundProject } from '../utils/web3';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { DollarSign } from 'lucide-react';

interface FundingFormProps {
  projectId: number;
  onSuccess: () => void;
}

const FundingForm: React.FC<FundingFormProps> = ({ projectId, onSuccess }) => {
  const { connected } = useWeb3();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setLoading(true);
    
    try {
      await fundProject(projectId, amount);
      toast.success(`Successfully funded ${amount} ETH!`);
      setAmount('');
      onSuccess();
    } catch (error: any) {
      console.error('Error funding project:', error);
      toast.error(error.message || 'Failed to fund project');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Support this project</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Amount (ETH)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter amount in ETH"
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={loading || !connected}
          className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg ${
            (loading || !connected) ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Processing...' : 'Fund Project'}
        </motion.button>
        
        {!connected && (
          <p className="text-center text-red-500 mt-2 text-sm">
            Please connect your wallet to fund this project
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default FundingForm;