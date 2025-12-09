"use client";

import { useState, useDeferredValue } from "react";

interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}
export default function Home() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);

  async function search(value: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
      value
    )}`;

    const res = await fetch(url);
    const data: NominatimResult[] = await res.json();
    setSuggestions(data);
  }

  const handleChange = async (value: string) => {
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    search(deferredQuery);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Moving Date
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Moving Address
            </label>
            <input
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              type="text"
              placeholder="Enter address…"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />

            {suggestions.length > 0 && (
              <div className="">
                {suggestions.map((item) => (
                  <button
                    key={item.place_id}
                    type="button"
                    onClick={() => {
                      setQuery(item.display_name);
                      setSuggestions([]);
                    }}
                    className=""
                  >
                    {item.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
