import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from "framer-motion";
import Logo from "/Images/logo.png";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    const navigate = useNavigate()

  const { user, isLoading } = useAuth();

  if (isLoading) {
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex justify-center items-center bg-black z-50"
    >
      <img src={Logo} alt="Loading..." className="w-56 h-56 animate-pulse" />
    </motion.div>
  }


  if (user === null) {
    navigate("/login")
  }

  return children;

};

export default ProtectedRoute;