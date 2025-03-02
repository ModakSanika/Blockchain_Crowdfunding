import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { withdrawFunds, claimRefund } from '../utils/web3';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowDownToLine, RefreshCw } from 'lucide-react';

interface ProjectActionsProps {
  projectId: number;
  creator: string;
  funded: boolean;
  completed: boolean;
  deadlinePassed: boolean;
  hasContribution: boolean;
  onSuccess: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
  projectId,
  creator,
  funded,
  completed,
  deadlinePassed,
  hasContribution,
  onSuccess,
}) => {
  const { account, connected } = useWeb3();
  const [loading, setLoading] = useState(false);
  
  const isCreator = account && account.toLowerCase() === creator.toLowerCase();
  
  const handleWithdraw = async () => {
    if (!connected || !isCreator) return;
    
    setLoading(true);
    
    try {
      await withdrawFunds(projectId);
      toast.success('Funds withdrawn successfully!');
      onSuccess();
    } catch (error: any) {
      console.error('Error withdrawing funds:', error);
      toast.error(error.message || 'Failed to withdraw funds');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefund = async () => {
    if (!connected || !hasContribution) return;
    
    setLoading(true);
    
    try {
      await claimRefund(projectId);
      toast.success('Refund claimed successfully!');
      onSuccess();
    } catch (error: any) {
      console.error('Error claiming refund:', error);
      toast.error(error.message || 'Failed to claim refund');
    } finally {
      setLoading(false);
    }
  };
  
  // Show withdraw button for creator if project is funded but not completed
  const showWithdraw = isCreator && funded && !completed;
  
  // Show refund button for contributors if deadline passed, project not funded, and not completed
  const showRefund = hasContribution && deadlinePassed && !funded && !completed;
  
  if (!showWithdraw && !showRefund) return null;
  
  return (
    <motion.div
      className="mt-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showWithdraw && (
        <motion.button
          onClick={handleWithdraw}
          disabled={loading || !connected}
          className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            (loading || !connected) ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowDownToLine size={18} />
          <span>{loading ? 'Processing...' : 'Withdraw Funds'}</span>
        </motion.button>
      )}
      
      {showRefund && (
        <motion.button
          onClick={handleRefund}
          disabled={loading || !connected}
          className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            (loading || !connected) ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-red-600'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw size={18} />
          <span>{loading ? 'Processing...' : 'Claim Refund'}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProjectActions;