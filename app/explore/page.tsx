"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedHero from "@/components/AnimatedHero";
import AnimatedTitle from "@/components/AnimatedTitle";
import { PLACES, ROUTES } from "@/lib/siteData";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] items-center justify-center rounded-[22px] border border-white/10 bg-white/5 text-white/50">
      Loading map...
    </div>
  ),
});

export default function ExplorePage() {
  const allPlaceIds = PLACES.map((place) => place.id);
  const [activeRouteIds, setActiveRouteIds] = useState<string[]>(allPlaceIds);
  const [focusedPlaceId, setFocusedPlaceId] = useState<string>(PLACES[0].id);
  const showAllConnections = activeRouteIds.length === allPlaceIds.length;

  const selectRoute = (placeIds: string[]) => {
    setActiveRouteIds(placeIds);
    setFocusedPlaceId(placeIds[0] ?? PLACES[0].id);
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-white">
      <AnimatedHero activeTab="explore" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="space-y-3">
            <AnimatedTitle text="Explore" className="text-3xl md:text-4xl" />
            <p className="max-w-3xl leading-8 text-white/70">
              Open Kazakhstan on an interactive map, scan every attraction path, then focus
              any route or destination before building your final plan.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="glass-card p-4">
              <Map
                routePlaceIds={activeRouteIds}
                focusedPlaceId={focusedPlaceId}
                showAllConnections={showAllConnections}
              />
            </div>

            <div className="glass-card p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-white/40">Route paths</p>
              <h3 className="mt-3 text-2xl font-semibold">Map network</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Switch between the full attraction network and ready travel paths.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => selectRoute(allPlaceIds)}
                  className={`btn ${showAllConnections ? "btn-active" : "bg-white/5 text-white/80"}`}
                >
                  All attractions
                </button>
                {ROUTES.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => selectRoute(route.placeIds)}
                    className={`btn ${
                      activeRouteIds.join("-") === route.placeIds.join("-")
                        ? "btn-active"
                        : "bg-white/5 text-white/80"
                    }`}
                  >
                    {route.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                {(showAllConnections ? PLACES : PLACES.filter((place) => activeRouteIds.includes(place.id))).map(
                  (place) => (
                    <button
                      key={place.id}
                      onClick={() => setFocusedPlaceId(place.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        focusedPlaceId === place.id
                          ? "border-white/30 bg-white/12"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                        {place.region}
                      </span>
                      <span className="mt-1 block font-semibold text-white">{place.name}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLACES.map((place, index) => (
              <motion.button
                key={place.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setFocusedPlaceId(place.id)}
                className={`glass-card p-5 text-left ${
                  focusedPlaceId === place.id ? "border-white/30 bg-white/10" : ""
                }`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">{place.region}</p>
                <h3 className="mt-3 text-xl font-semibold">{place.name}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-white/65">{place.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    {place.duration}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    {place.bestTime}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
