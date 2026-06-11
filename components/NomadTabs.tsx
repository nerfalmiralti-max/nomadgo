"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NomadTabs() {
  const [active, setActive] = useState("map");

  const tabs = [
    { id: "map", label: "Map" },
    { id: "places", label: "Places" },
    { id: "dashboard", label: "Dashboard" },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex bg-white/70 backdrop-blur-xl border border-gray-200 rounded-full p-1 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              active === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {active === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}