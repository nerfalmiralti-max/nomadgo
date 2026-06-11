export type PlaceCategory = "city" | "nature" | "culture" | "desert";

export type TravelPlace = {
  id: string;
  name: string;
  region: string;
  desc: string;
  category: PlaceCategory;
  duration: string;
  bestTime: string;
  coordinates: [number, number];
  facts: string[];
  bio: string;
};

export type RouteTemplate = {
  id: string;
  title: string;
  mood: string;
  days: number;
  distance: string;
  placeIds: string[];
  description: string;
  steps: string[];
};

export const PLACES: TravelPlace[] = [
  {
    id: "almaty",
    name: "Almaty",
    region: "Almaty",
    desc: "Mountains, cafes, parks and cultural city rhythm",
    category: "city",
    duration: "1-2 days",
    bestTime: "April - October",
    coordinates: [43.238, 76.945],
    facts: [
      "Start here for mountain routes",
      "Good base for Charyn and Kaindy",
      "Many English-speaking guides",
    ],
    bio:
      "Almaty is the easiest entry point for a first Kazakhstan trip: mountain views, city comfort and fast access to nature.",
  },
  {
    id: "astana",
    name: "Astana",
    region: "Akmola",
    desc: "Futuristic capital with architecture and river walks",
    category: "city",
    duration: "1 day",
    bestTime: "May - September",
    coordinates: [51.169, 71.449],
    facts: [
      "Best for architecture lovers",
      "Compact city route works in one day",
      "Cold and windy in winter",
    ],
    bio:
      "Astana is a planned capital with clean boulevards, modern landmarks and a strong contrast to Kazakhstan's wild landscapes.",
  },
  {
    id: "charyn",
    name: "Charyn Canyon",
    region: "Almaty Region",
    desc: "Red canyon walls and dramatic viewpoints",
    category: "nature",
    duration: "1 day",
    bestTime: "March - November",
    coordinates: [43.354, 79.08],
    facts: [
      "Around 200 km from Almaty",
      "Valley of Castles is the classic route",
      "Bring water and sun protection",
    ],
    bio:
      "Charyn Canyon is one of the most iconic natural sights in Kazakhstan, especially for first-time visitors.",
  },
  {
    id: "kaindy",
    name: "Kaindy Lake",
    region: "Almaty Region",
    desc: "Turquoise mountain lake with a sunken forest",
    category: "nature",
    duration: "1 day",
    bestTime: "June - September",
    coordinates: [42.984, 78.466],
    facts: [
      "High mountain road requires planning",
      "Often paired with Kolsai Lakes",
      "Weather changes quickly",
    ],
    bio:
      "Kaindy Lake feels cinematic: cold turquoise water, pine trunks rising from the lake and quiet mountain air.",
  },
  {
    id: "turkistan",
    name: "Turkistan",
    region: "Turkistan",
    desc: "Silk Road heritage and historic architecture",
    category: "culture",
    duration: "1 day",
    bestTime: "March - May, September - November",
    coordinates: [43.297, 68.252],
    facts: [
      "Key Silk Road destination",
      "Visit Khoja Ahmed Yasawi Mausoleum",
      "Hot summers, plan mornings and evenings",
    ],
    bio:
      "Turkistan brings cultural depth to a Kazakhstan route with spiritual history, old trade routes and warm southern atmosphere.",
  },
  {
    id: "bozzhyra",
    name: "Bozzhyra",
    region: "Mangystau",
    desc: "White cliffs, desert silence and alien landscapes",
    category: "desert",
    duration: "2 days",
    bestTime: "April - June, September - October",
    coordinates: [43.415, 54.071],
    facts: [
      "4x4 vehicle is strongly recommended",
      "Best with a local driver-guide",
      "No city services nearby",
    ],
    bio:
      "Bozzhyra is for travelers who want the raw, remote side of Kazakhstan: chalk cliffs, open sky and desert scale.",
  },
];

export const ROUTES: RouteTemplate[] = [
  {
    id: "almaty-nature",
    title: "Almaty Nature Loop",
    mood: "Mountains and canyon",
    days: 3,
    distance: "520 km",
    placeIds: ["almaty", "kaindy", "charyn"],
    description:
      "A balanced route from Almaty to Kaindy Lake and Charyn Canyon with enough time for views, photos and rest.",
    steps: [
      "Day 1: Almaty city walk, Kok-Tobe and food spots.",
      "Day 2: Early road to Kaindy Lake, mountain viewpoints and overnight near Saty.",
      "Day 3: Charyn Canyon walk, sunset viewpoint and return to Almaty.",
    ],
  },
  {
    id: "capital-sprint",
    title: "Capital Sprint",
    mood: "Architecture and city comfort",
    days: 1,
    distance: "35 km",
    placeIds: ["astana"],
    description:
      "A compact Astana plan for travelers who want modern architecture, museums and an evening river walk.",
    steps: [
      "Morning: Baiterek, Nurzhol Boulevard and coffee stop.",
      "Afternoon: National Museum or Khan Shatyr.",
      "Evening: Ishim river walk and city lights.",
    ],
  },
  {
    id: "silk-road",
    title: "Silk Road Heritage",
    mood: "History and culture",
    days: 2,
    distance: "190 km",
    placeIds: ["turkistan"],
    description:
      "A southern cultural route centered on Turkistan, heritage architecture and slow evening walks.",
    steps: [
      "Day 1: Arrival, Yasawi Mausoleum and old city area.",
      "Day 2: Local markets, viewpoints and relaxed departure.",
    ],
  },
  {
    id: "mangystau-expedition",
    title: "Mangystau Expedition",
    mood: "Remote desert",
    days: 4,
    distance: "780 km",
    placeIds: ["bozzhyra"],
    description:
      "A rugged 4x4 desert route for travelers who want silence, scale and unusual landscapes.",
    steps: [
      "Day 1: Aktau arrival, supplies and guide briefing.",
      "Day 2: Road into Mangystau, sunset near Bozzhyra.",
      "Day 3: Viewpoints, short hikes and desert camp.",
      "Day 4: Return to Aktau with photo stops.",
    ],
  },
];

export const CHAT_OPTIONS = [
  "Build me a 3 day nature route",
  "Where should I go first in Kazakhstan?",
  "What should I know before Bozzhyra?",
  "Plan one day in Astana",
  "I want culture and history",
];

export const normalizeQuery = (text: string) => text.trim().toLowerCase();

const includesAny = (text: string, words: string[]) =>
  words.some((word) => text.includes(word));

export function getPlacesByIds(ids: string[]) {
  return ids
    .map((id) => PLACES.find((place) => place.id === id))
    .filter((place): place is TravelPlace => Boolean(place));
}

export function buildRouteToPlace(placeId: string, days = 2) {
  const destination = PLACES.find((place) => place.id === placeId) ?? PLACES[0];
  const start = destination.id === "almaty" ? destination : PLACES.find((place) => place.id === "almaty") ?? PLACES[0];
  const placeIds = start.id === destination.id ? [destination.id] : [start.id, destination.id];
  const adjustedDays = Math.max(1, Math.min(5, days));

  const transport =
    destination.category === "desert"
      ? "4x4 with a local driver-guide"
      : destination.category === "city"
        ? "taxi, walking and public transport"
        : "car transfer with early departure";

  const steps =
    start.id === destination.id
      ? [
          `Day 1: Arrive in ${destination.name}, check the central area and choose a comfortable base.`,
          `Day ${adjustedDays}: Keep the final part flexible for cafes, viewpoints and departure timing.`,
        ]
      : [
          `Day 1: Start in ${start.name}, prepare transport, water and offline map.`,
          `Day 2: Travel to ${destination.name} by ${transport}, stop at viewpoints and arrive before sunset.`,
          `Day ${adjustedDays}: Slow morning at ${destination.name}, then return or continue the route.`,
        ];

  return {
    title: `Road to ${destination.name}`,
    destination,
    placeIds,
    transport,
    days: adjustedDays,
    steps: Array.from(new Set(steps)),
  };
}

export function buildAssistantReply(input: string) {
  const prompt = normalizeQuery(input);

  if (includesAny(prompt, ["hello", "hi", "hey", "start", "begin", "привет", "начать"])) {
    return "Tell me your travel dates, city of arrival, budget level and mood: nature, city, culture, food or remote landscapes. If you are unsure, start with Almaty: it gives the safest mix of comfort, mountains and day trips.";
  }

  if (includesAny(prompt, ["1 day", "one day", "один день", "1 день", "day trip"])) {
    return "For one day, keep the route compact. In Almaty: Kok-Tobe, Panfilov Park, Green Bazaar, then Medeu or a mountain viewpoint. In Astana: Baiterek, Nurzhol Boulevard, National Museum or Khan Shatyr, then an Ishim river walk.";
  }

  if (includesAny(prompt, ["2 day", "two day", "2 дня", "weekend", "выходные"])) {
    return "For 2 days, choose one base and one strong outside trip. Best easy plan: Day 1 Almaty city, Kok-Tobe and food stops. Day 2 Charyn Canyon with early departure, water, sun protection and return before late evening.";
  }

  if (includesAny(prompt, ["3", "three", "nature", "природ", "горы", "mountain"])) {
    return "For a 3 day nature trip, choose Almaty Nature Loop: Day 1 Almaty, Day 2 Kaindy Lake or Kolsai area, Day 3 Charyn Canyon. It is the best first route because travel time, scenery and comfort are balanced.";
  }

  if (includesAny(prompt, ["4 day", "four", "5 day", "five", "неделя", "week"])) {
    return "For 4-5 days, build a stronger loop: Almaty arrival, Kaindy/Kolsai overnight near Saty, Charyn Canyon, then one flexible city day for food, viewpoints and rest. If you want remote drama, use those days for Mangystau with a 4x4 guide instead.";
  }

  if (includesAny(prompt, ["bozzhyra", "mangystau", "desert", "бозжыра", "мангыстау", "мангистау", "пустын"])) {
    return "For Bozzhyra, plan a 4x4 car, local driver-guide, offline maps, water, snacks and warm layers for evening. Do not treat it like a city day trip: the beauty is remote, and the logistics matter.";
  }

  if (includesAny(prompt, ["astana", "capital", "астана", "столица"])) {
    return "In Astana, start with Baiterek and Nurzhol Boulevard, then visit the National Museum or Khan Shatyr, and finish with an Ishim river walk after sunset.";
  }

  if (includesAny(prompt, ["almaty", "алматы", "алма"])) {
    return "In Almaty, combine city comfort with mountain access: Panfilov Park, Green Bazaar, Kok-Tobe, then Medeu or a nearby viewpoint. For a stronger nature day, add Charyn Canyon or Kaindy Lake with an early transfer.";
  }

  if (includesAny(prompt, ["charyn", "чарын", "canyon", "каньон"])) {
    return "For Charyn Canyon, leave Almaty early, carry water and sun protection, walk the Valley of Castles, and save time for a sunset viewpoint if transport allows. It works as a long day trip, but do not underestimate the road time.";
  }

  if (includesAny(prompt, ["kaindy", "kolsai", "каинды", "кайнды", "кольсай", "lake", "озеро"])) {
    return "For Kaindy and Kolsai, plan mountain weather and slower roads. Best simple format: overnight near Saty, Kaindy first, Kolsai next, then return to Almaty. Bring layers, cash for local services and offline maps.";
  }

  if (includesAny(prompt, ["culture", "history", "turkistan", "культур", "истори", "туркестан"])) {
    return "For culture and history, go to Turkistan. Build the day around the Yasawi Mausoleum, old city area, local food and a slow evening walk when the heat drops.";
  }

  if (includesAny(prompt, ["budget", "cheap", "cost", "money", "бюджет", "дешев", "сколько стоит", "цена"])) {
    return "For a budget-friendly Kazakhstan trip, stay in Almaty or Astana, use city taxis and public transport, choose one paid long transfer, and keep remote places for when you can share a car. Markets, city walks and viewpoints give strong value.";
  }

  if (includesAny(prompt, ["transport", "car", "taxi", "train", "bus", "транспорт", "машин", "такси", "поезд", "автобус"])) {
    return "Transport rule: use walking, taxis and public transport inside cities; use a planned car transfer for Charyn, Kaindy and Kolsai; use 4x4 plus local driver for Mangystau and Bozzhyra. For intercity comfort, compare trains and domestic flights.";
  }

  if (includesAny(prompt, ["safe", "danger", "risk", "solo", "woman", "безопас", "опасн", "одна", "один"])) {
    return "Kazakhstan is manageable for careful travelers: keep documents backed up, use registered taxis, share long-route details, avoid remote areas without a guide, carry water outside cities and check weather before mountain or desert trips.";
  }

  if (includesAny(prompt, ["family", "kids", "children", "ребен", "дет", "семья"])) {
    return "With family or kids, keep routes shorter and predictable: Almaty city, Kok-Tobe, parks, Medeu area, Astana architecture walks and museums. Avoid very long desert roads unless the group is comfortable with remote travel.";
  }

  if (includesAny(prompt, ["food", "eat", "restaurant", "dish", "еда", "ресторан", "что попробовать"])) {
    return "For food, try beshbarmak, baursak, kazy, lagman, plov and tea culture. In cities, mix one local restaurant with a market stop like Green Bazaar. For remote trips, carry snacks because cafes can be far apart.";
  }

  if (includesAny(prompt, ["season", "month", "weather", "winter", "summer", "spring", "autumn", "сезон", "погода", "зима", "лето", "весна", "осень"])) {
    return "Best general season is April to October. Spring and autumn are comfortable for cities, canyons and Turkistan. Summer is good for high mountain lakes but hot in the south. Winter works best for city routes and snowy mountain views near Almaty.";
  }

  if (includesAny(prompt, ["visa", "passport", "document", "виза", "паспорт", "документ"])) {
    return "For documents, check your passport validity, entry rules for your nationality and hotel registration requirements before departure. Keep digital copies offline. I cannot confirm live visa rules, so verify them with an official source before booking.";
  }

  if (includesAny(prompt, ["pack", "bring", "clothes", "wear", "bag", "что взять", "одежд", "рюкзак"])) {
    return "Pack layers, comfortable walking shoes, sun protection, refillable water bottle, power bank, offline maps and some cash. For mountains add a warm layer and rain shell. For desert add extra water, snacks and wind protection.";
  }

  if (includesAny(prompt, ["photo", "instagram", "view", "sunset", "sunrise", "фото", "вид", "закат", "рассвет"])) {
    return "For photos, choose Kok-Tobe or mountain viewpoints near Almaty, Valley of Castles in Charyn, Kaindy Lake for surreal water colors, Astana city lights, Turkistan in soft evening light and Bozzhyra for sunrise or sunset scale.";
  }

  if (includesAny(prompt, ["romantic", "couple", "date", "роман", "пара", "свидан"])) {
    return "For a romantic route, choose Almaty cafes plus Kok-Tobe at sunset, a calm mountain viewpoint, or an Astana evening river walk. If you want something cinematic, Kaindy/Kolsai with an overnight near Saty feels more memorable.";
  }

  if (includesAny(prompt, ["adventure", "extreme", "hike", "camp", "приключ", "поход", "кемп", "экстрим"])) {
    return "For adventure, choose Charyn hiking viewpoints, Kaindy/Kolsai mountain roads, or Mangystau desert landscapes. Keep it safe: local guide for remote zones, offline maps, water, weather check and no last-minute night driving.";
  }

  if (includesAny(prompt, ["first", "where should", "куда", "впервые", "первый раз"])) {
    return "Start in Almaty if this is your first Kazakhstan trip. It gives you city comfort, mountain access, and easy day trips to Kaindy Lake and Charyn Canyon.";
  }

  if (includesAny(prompt, ["compare", "better", "which", "or ", "сравни", "лучше", "или"])) {
    return "Choose by mood: Almaty is best for first-time nature and food, Astana for clean architecture and an easy city day, Turkistan for history, Charyn for a dramatic day trip, Kaindy/Kolsai for mountains, and Bozzhyra for remote desert scale.";
  }

  return "I would choose the route based on your travel style: Almaty Nature Loop for first-time nature, Capital Sprint for one clean city day, Silk Road Heritage for culture, Mangystau Expedition for remote desert adventure, or a compact city route if time and budget are tight.";
}
