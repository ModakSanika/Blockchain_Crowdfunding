'use client';

import { useState } from 'react';
import { useContract } from '../../../hooks/useContract';
import { ethers } from 'ethers';

export default function CreateProjectPage() {
  const contract = useContract();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contract) {
      alert('Contract is not initialized. Please wait and try again.');
      return;
    }

    try {
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
      const fundingGoalInWei = ethers.utils.parseEther(fundingGoal);

      console.log("Calling createProject with:", {
        title,
        description,
        fundingGoalInWei: fundingGoalInWei.toString(),
        deadlineTimestamp,
      });

      // Direct call to contract method with ethers.js
      const tx = await contract.createProject(
        title, 
        description, 
        fundingGoalInWei, 
        deadlineTimestamp,
        { value: ethers.utils.parseEther('0.01') }
      );

      await tx.wait();
      alert('Project created successfully!');
    } catch (err) {
      console.error('Failed to create project:', err);
      alert(`Failed to create project: ${(err as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          ✨ Create New Project
        </h1>
        <p className="text-gray-600 mb-6 flex items-center gap-2">
          📝 Fill in the details below to launch your amazing project
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              📛 Project Title
            </h2>
            <input
              type="text"
              placeholder="Enter your project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              📄 Description
            </h2>
            <textarea
              placeholder="Describe your amazing project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded h-32"
              required
            />
          </div>

          <div className="border-t border-gray-300 pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💰 Funding Goal (ETH)
            </h2>
            <input
              type="number"
              placeholder="0.00"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />

            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ⏰ Deadline
            </h2>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            🚀 Launch Project
          </button>
        </form>
      </div>
    </div>
  );
}