import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "NomadGo — travel-tech для Казахстана",
  description:
    "NomadGo объединяет цифровые маршруты, минималистичный дизайн и интерактивный чат-помощник для путешествий по Казахстану.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#070707] text-white">
        {children}
      </body>
    </html>
  );
}
