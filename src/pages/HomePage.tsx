import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, Plus, TrendingUp, Shield } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-indigo-900/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Decentralized Crowdfunding on the Blockchain
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Fund innovative projects with cryptocurrency. Transparent,
                secure, and without intermediaries.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/projects">
                  <motion.button
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TrendingUp size={18} />
                    <span>Explore Projects</span>
                  </motion.button>
                </Link>
                <Link to="/create">
                  <motion.button
                    className="w-full sm:w-auto bg-white text-purple-600 border border-purple-600 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={18} />
                    <span>Start a Project</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <img
                src="https://www.ledgerinsights.com/wp-content/uploads/2023/11/blockchain-crowdfunding.jpg"
                alt="Blockchain Crowdfunding"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our blockchain-based crowdfunding platform makes it easy to fund
              and create projects with complete transparency and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="w-12 h-12 text-purple-600" />,
                title: "Connect Wallet",
                description:
                  "Connect your MetaMask wallet to interact with the blockchain and manage your funds securely.",
              },
              {
                icon: <Plus className="w-12 h-12 text-purple-600" />,
                title: "Create or Fund",
                description:
                  "Start your own project or browse existing ones to fund with cryptocurrency.",
              },
              {
                icon: <Shield className="w-12 h-12 text-purple-600" />,
                title: "Secure Transactions",
                description:
                  "All transactions are secured by smart contracts. If funding goals aren't met, you get your money back.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
            Join our community of innovators and backers. Create your project
            today or discover exciting initiatives to support.
          </p>
          <Link to="/create">
            <motion.button
              className="bg-white text-purple-700 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch Your Project
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
