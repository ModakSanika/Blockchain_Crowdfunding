import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import {
  formatDate,
  calculateFundingProgress,
  isDeadlinePassed,
} from "../utils/web3";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  fundingGoal: string;
  amountRaised: string;
  deadline: Date;
  completed: boolean;
  funded: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  fundingGoal,
  amountRaised,
  deadline,
  completed,
  funded,
}) => {
  const progress = calculateFundingProgress(amountRaised, fundingGoal);
  const deadlinePassed = isDeadlinePassed(deadline);

  const getStatusBadge = () => {
    if (completed) {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Completed
        </span>
      );
    }

    if (funded) {
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Funded
        </span>
      );
    }

    if (deadlinePassed) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Expired
        </span>
      );
    }

    return (
      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
        Active
      </span>
    );
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">{getStatusBadge()}</div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Target size={16} className="mr-1 text-purple-600" />
            <span>
              {amountRaised} / {fundingGoal} ETH
            </span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-purple-600" />
            <span>{formatDate(deadline)}</span>
          </div>
        </div>

        <Link
          to={`/project/${id}`}
          className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
