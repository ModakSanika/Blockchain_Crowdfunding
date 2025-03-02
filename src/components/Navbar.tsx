import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import { Wallet, Plus, Home, List } from "lucide-react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const { account, connectWallet, connected, loading } = useWeb3();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Wallet size={28} className="text-purple-300" />
            </motion.div>
            <span className="text-xl font-bold">Genesis</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`flex items-center space-x-1 hover:text-purple-300 transition-colors ${
                isActive("/") ? "text-purple-300 font-semibold" : ""
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/projects"
              className={`flex items-center space-x-1 hover:text-purple-300 transition-colors ${
                isActive("/projects") ? "text-purple-300 font-semibold" : ""
              }`}
            >
              <List size={18} />
              <span>Projects</span>
            </Link>
            <Link
              to="/create"
              className={`flex items-center space-x-1 hover:text-purple-300 transition-colors ${
                isActive("/create") ? "text-purple-300 font-semibold" : ""
              }`}
            >
              <Plus size={18} />
              <span>Create Project</span>
            </Link>
          </div>

          <div>
            {connected ? (
              <div className="bg-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                {account?.substring(0, 6)}...
                {account?.substring(account.length - 4)}
              </div>
            ) : (
              <motion.button
                onClick={connectWallet}
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-full shadow-md transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet size={16} />
                <span>{loading ? "Connecting..." : "Connect Wallet"}</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-purple-700">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive("/") ? "text-purple-300" : ""
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/projects"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive("/projects") ? "text-purple-300" : ""
            }`}
          >
            <List size={20} />
            <span className="text-xs">Projects</span>
          </Link>
          <Link
            to="/create"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive("/create") ? "text-purple-300" : ""
            }`}
          >
            <Plus size={20} />
            <span className="text-xs">Create</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
