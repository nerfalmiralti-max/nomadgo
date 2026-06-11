"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PLACES, ROUTES, buildRouteToPlace, getPlacesByIds } from "@/lib/siteData";

const interestOptions = [
  { id: "nature", label: "Nature" },
  { id: "city", label: "City" },
  { id: "culture", label: "Culture" },
  { id: "desert", label: "Desert" },
] as const;

const paceOptions = ["Relaxed", "Balanced", "Active"] as const;

type RoutePlannerProps = {
  onRouteChange?: (placeIds: string[]) => void;
};

export default function RoutePlanner({ onRouteChange }: RoutePlannerProps) {
  const [days, setDays] = useState(3);
  const [interest, setInterest] = useState<(typeof interestOptions)[number]["id"]>("nature");
  const [pace, setPace] = useState<(typeof paceOptions)[number]>("Balanced");
  const [selectedPlaceId, setSelectedPlaceId] = useState(PLACES[2].id);

  const generatedRoute = useMemo(() => {
    const roadToPlace = buildRouteToPlace(selectedPlaceId, days);
    const scored = ROUTES.map((route) => {
      const places = getPlacesByIds(route.placeIds);
      const categoryScore = places.some((place) => place.category === interest) ? 3 : 0;
      const daysScore = Math.max(0, 3 - Math.abs(route.days - days));
      const paceScore =
        pace === "Active" && route.days <= days
          ? 1
          : pace === "Relaxed" && route.days >= days
            ? 1
            : 0;

      return {
        route,
        score: categoryScore + daysScore + paceScore,
      };
    }).sort((a, b) => b.score - a.score);

    const matchedTemplate = scored[0].route;
    const selectedPlace = PLACES.find((place) => place.id === selectedPlaceId);

    if (selectedPlace && selectedPlace.category === interest) {
      return {
        id: `road-${selectedPlace.id}`,
        title: roadToPlace.title,
        mood: `Generated for ${selectedPlace.name}`,
        days: roadToPlace.days,
        distance: roadToPlace.destination.region,
        placeIds: roadToPlace.placeIds,
        description: `AI-style path focused on reaching ${selectedPlace.name} with ${roadToPlace.transport}.`,
        steps: roadToPlace.steps,
      };
    }

    return matchedTemplate;
  }, [days, interest, pace, selectedPlaceId]);

  const routePlaces = getPlacesByIds(generatedRoute.placeIds);

  const handleApplyRoute = () => {
    onRouteChange?.(generatedRoute.placeIds);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-white/40">AI route generator</p>
        <h3 className="mt-3 text-2xl font-semibold">Build your path</h3>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm text-white/60">Trip length: {days} days</span>
            <input
              type="range"
              min="1"
              max="5"
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
              className="mt-3 w-full accent-indigo-400"
            />
          </label>

          <div className="space-y-3">
            <p className="text-sm text-white/60">Main interest</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setInterest(option.id)}
                  className={`btn ${interest === option.id ? "btn-active" : "bg-white/5 text-white/80"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-3">
            <span className="text-sm text-white/60">Destination</span>
            <select
              value={selectedPlaceId}
              onChange={(event) => setSelectedPlaceId(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-4 text-white outline-none focus:border-white/30"
            >
              {PLACES.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-3">
            <p className="text-sm text-white/60">Travel pace</p>
            <div className="flex flex-wrap gap-2">
              {paceOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setPace(option)}
                  className={`btn ${pace === option ? "btn-active" : "bg-white/5 text-white/80"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleApplyRoute} className="btn chat-button w-full">
            Generate road to attraction
          </button>
        </div>
      </motion.div>

      <motion.div
        key={generatedRoute.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/40">{generatedRoute.mood}</p>
            <h3 className="mt-3 text-2xl font-semibold">{generatedRoute.title}</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            {generatedRoute.days} days / {generatedRoute.distance}
          </div>
        </div>

        <p className="mt-5 leading-7 text-white/70">{generatedRoute.description}</p>

        <div className="mt-6 grid gap-3">
          {generatedRoute.steps.map((step) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/75">
              {step}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {routePlaces.map((place) => (
            <span key={place.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
              {place.name}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PLACES.filter((place) => generatedRoute.placeIds.includes(place.id)).map((place) => (
            <div key={place.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white/90">{place.name}</p>
              <p className="mt-2 text-xs leading-5 text-white/50">{place.bestTime}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
