import { useContract } from '../../hooks/useContract';
import { useState } from 'react';

interface WithdrawButtonProps {
  projectId: string;
}

export default function WithdrawButton({ projectId }: WithdrawButtonProps) {
  const contract = useContract();
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!contract) return;
    
    setIsLoading(true);
    try {
      const tx = await contract.callContract('withdrawFunds', [projectId]);
      await tx.wait();
      alert('Funds withdrawn successfully!');
    } catch (error) {
      console.error('Withdrawal failed:', error);
      alert('Withdrawal failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWithdraw}
      disabled={isLoading}
      className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg disabled:opacity-50"
    >
      {isLoading ? 'Processing...' : 'Withdraw Funds'}
    </button>
  );
}