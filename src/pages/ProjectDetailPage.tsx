import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import {
  getProject,
  getContribution,
  formatDate,
  calculateFundingProgress,
  isDeadlinePassed,
  formatAddress,
} from "../utils/web3";
import FundingForm from "../components/FundingForm";
import ProjectActions from "../components/ProjectActions";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Target,
  User,
  Users,
  AlertCircle,
} from "lucide-react";

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "0");
  const { connected, account } = useWeb3();

  const [project, setProject] = useState<any>(null);
  const [contribution, setContribution] = useState("0");
  const [loading, setLoading] = useState(true);

  const fetchProjectData = async () => {
    if (!connected || projectId <= 0) {
      setLoading(false);
      return;
    }

    try {
      const projectData = await getProject(projectId);
      setProject(projectData);

      if (account) {
        const userContribution = await getContribution(projectId, account);
        setContribution(userContribution);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [connected, account, projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-gray-50 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your MetaMask wallet to view project details and
            interact with the blockchain.
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-gray-50 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Project Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The project you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const progress = calculateFundingProgress(
    project.amountRaised,
    project.fundingGoal
  );
  const deadlinePassed = isDeadlinePassed(project.deadline);
  const hasContribution = parseFloat(contribution) > 0;
  const isCreator =
    account && account.toLowerCase() === project.creator.toLowerCase();

  const getStatusBadge = () => {
    if (project.completed) {
      return (
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          Completed
        </span>
      );
    }

    if (project.funded) {
      return (
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          Funded
        </span>
      );
    }

    if (deadlinePassed) {
      return (
        <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
          Expired
        </span>
      );
    }

    return (
      <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
        Active
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/projects"
        className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={
                  project.imageUrl ||
                  "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                }
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">{getStatusBadge()}</div>
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <User size={18} className="mr-2 text-purple-600" />
                  <span>
                    Created by{" "}
                    {isCreator ? "You" : formatAddress(project.creator)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2 text-purple-600" />
                  <span>Deadline: {formatDate(project.deadline)}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Funding Progress</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center text-gray-700">
                    <Target size={16} className="mr-1 text-purple-600" />
                    <span>
                      {project.amountRaised} / {project.fundingGoal} ETH
                    </span>
                  </div>
                  {hasContribution && (
                    <div className="flex items-center text-gray-700">
                      <Users size={16} className="mr-1 text-purple-600" />
                      <span>Your contribution: {contribution} ETH</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  About this project
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {deadlinePassed && !project.funded && !project.completed && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">
                      Funding Goal Not Reached
                    </h4>
                    <p className="text-red-700 text-sm">
                      This project did not reach its funding goal before the
                      deadline. Contributors can claim refunds.
                    </p>
                  </div>
                </div>
              )}

              {project.completed && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <AlertCircle
                    size={20}
                    className="text-green-500 mr-3 mt-0.5"
                  />
                  <div>
                    <h4 className="font-medium text-green-800">
                      Project Successfully Funded
                    </h4>
                    <p className="text-green-700 text-sm">
                      This project has been successfully funded and the creator
                      has withdrawn the funds.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!deadlinePassed && !project.completed && (
            <FundingForm projectId={projectId} onSuccess={fetchProjectData} />
          )}

          <ProjectActions
            projectId={projectId}
            creator={project.creator}
            funded={project.funded}
            completed={project.completed}
            deadlinePassed={deadlinePassed}
            hasContribution={hasContribution}
            onSuccess={fetchProjectData}
          />

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Project Details
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Project ID</span>
                <p className="font-medium">{project.id}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Creator</span>
                <p className="font-medium">{formatAddress(project.creator)}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Funding Goal</span>
                <p className="font-medium">{project.fundingGoal} ETH</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Amount Raised</span>
                <p className="font-medium">{project.amountRaised} ETH</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Deadline</span>
                <p className="font-medium">{formatDate(project.deadline)}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Status</span>
                <p className="font-medium">
                  {project.completed
                    ? "Completed"
                    : project.funded
                    ? "Funded"
                    : deadlinePassed
                    ? "Expired"
                    : "Active"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
