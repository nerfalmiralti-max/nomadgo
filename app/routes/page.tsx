"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedHero from "@/components/AnimatedHero";
import AnimatedTitle from "@/components/AnimatedTitle";
import RoutePlanner from "@/components/RoutePlanner";
import { ROUTES } from "@/lib/siteData";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] items-center justify-center rounded-[22px] border border-white/10 bg-white/5 text-white/50">
      Loading map...
    </div>
  ),
});

export default function RoutesPage() {
  const [mapRouteIds, setMapRouteIds] = useState<string[]>(ROUTES[0].placeIds);

  return (
    <div className="relative min-h-screen bg-[#070707] text-white">
      <AnimatedHero activeTab="routes" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="space-y-3">
            <AnimatedTitle text="Routes" className="text-3xl md:text-4xl" />
            <p className="max-w-3xl leading-8 text-white/70">
              Generate a route to Kazakhstan attractions by trip length, travel pace and
              interest, then preview the path directly on the built-in map.
            </p>
          </div>

          <RoutePlanner onRouteChange={setMapRouteIds} />

          <div className="glass-card p-4">
            <Map routePlaceIds={mapRouteIds} />
          </div>
        </motion.section>
      </main>
    </div>
  );
}
