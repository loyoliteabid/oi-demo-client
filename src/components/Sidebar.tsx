import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useWindowSize } from "../hooks/useWindowSize";
import Parameters from "./Parameters";

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [width] = useWindowSize();
  const isMobile = width <= 1024;

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const header = () => (
    <div
      className="flex items-center justify-between p-4 bg-black text-white cursor-pointer rounded-t-xl"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="font-bold text-lg uppercase border-b-2 border-primary">
        Filters
      </span>
      {isMobile && (
        <button
          className="text-xl bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
          aria-label="Close sidebar"
        >
          {isOpen ? "×" : ""}
        </button>
      )}
    </div>
  );

  return (
    <div className="relative">
      {/* Hamburger Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 border-2 border-gray-800 rounded-lg hover:scale-105 lg:hidden fixed z-20"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
            />
            <motion.div
              {...framerSidebarPanel}
              ref={sidebarRef}
              className="fixed top-0 left-0 z-50 w-full max-w-xs h-screen bg-gray-900 text-white shadow-lg"
              aria-label="Sidebar"
            >
              {header()}
              <Parameters isMobile={isMobile} setIsOpen={setIsOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="left-0 w-64 bg-gray-900 text-white shadow-lg rounded-xl">
          {header()}
          <Parameters isMobile={isMobile} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
