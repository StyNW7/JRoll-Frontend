// Default Import

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "/Images/logo.png";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Default Pages

import Layout from "@/layouts/root-layout";
import ScrollToTop from "./utility/ScrollToTop";
import CustomCursor from "./utility/CustomCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";

// Util Pages

import TermsOfServicePage from "./pages/Legal/terms";
import PrivacyPolicyPage from "./pages/Legal/privacy";
import ContactSupportPage from "./pages/Utility/Contact";
import FAQPage from "./pages/Utility/FAQ";
import NotFoundPage from "./pages/Utility/NotFound404";

// Pages

import LandingPage from "@/pages/Landing/page";

// Auth Pages

import WatchingPage from "./pages/Profiles/watching";
import RegisterPage from "./pages/Auth/register";
import LoginPage from "./pages/Auth/login";
import ProfileSettingsPage from "./pages/Profiles/settings";

// Essential Pages

import AnimeDetailPage from "./pages/Anime/[id]/page";
import SearchPage from "./pages/Search/page";
import CommentsPage from "./pages/Comments/[id]/page";
import WatchPage from "./pages/Watch/[id]/page";

import ProtectedRoute from "./components/ProtectedRoute";

// Loading Screen Animation

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex justify-center items-center bg-black z-50"
    >
      <img src={Logo} alt="Loading..." className="w-56 h-56 animate-pulse" />
    </motion.div>
  );
};

function App() {

  const [loading, setLoading] = useState(true);

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <BrowserRouter>
      <ScrollToTopFunction />
      <ScrollToTop />
      <CustomCursor />

      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes>

            {/* Default Pages */}

            <Route path="/" element={<Layout />}>

                <Route path="*" element={<NotFoundPage />} />
              
                <Route index element={<LandingPage/>} />

                <Route path="/settings" element={
                  <ProtectedRoute>
                    <ProfileSettingsPage/>
                  </ProtectedRoute>
                } />

                <Route path="/search" element={<SearchPage/>} />

                <Route path="/anime/:id" element={<AnimeDetailPage/>} />

                <Route path="/comments/:id" element={<CommentsPage/>} />

                <Route path="/watch/:id" element={
                  <ProtectedRoute>
                    <WatchPage/>
                  </ProtectedRoute>
                } />

                <Route path="/faq" element={<FAQPage/>} />
                <Route path="/contact" element={<ContactSupportPage/>} />
                <Route path="/terms" element={<TermsOfServicePage/>} />
                <Route path="/privacy" element={<PrivacyPolicyPage/>} />

            </Route>

            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />

            <Route path="/watching" element={
              <ProtectedRoute>
                <WatchingPage/>
              </ProtectedRoute>
              
            } />

          </Routes>

        )}

      </AnimatePresence>
      <Toaster position="top-center" />
    </BrowserRouter>

  );
}

export default App;
