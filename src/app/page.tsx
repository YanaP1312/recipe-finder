'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(query !== '' || cuisine !== '' || maxTime !== '');
  }, [query, cuisine, maxTime]);

  const handleSubmit = () => {
    if (query && !/^[a-zA-Z\s]+$/.test(query)) {
      toast.error('Query must contain only letters');
      return;
    }
    if (maxTime && (isNaN(Number(maxTime)) || Number(maxTime) < 1)) {
      toast.error('Preparation time must be a number greater than 0');
      return;
    }

    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxTime) params.append('maxReadyTime', maxTime);
    router.push(`/recipes?${params.toString()}`);
  };
  const isPlaceholder = cuisine === '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Recipe Finder</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Search recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 outline-none transition-colors duration-200 hover:border-blue-500"
          pattern="[A-Za-z\s]*"
        />

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className={`border border-gray-300 rounded p-2 outline-none transition-colors duration-200 hover:border-blue-500 ${
            cuisine === '' ? 'text-gray-500' : 'text-black'
          }`}
        >
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="American">American</option>
          <option value="European">European</option>
          <option value="Japanese">Japanese</option>
          <option value="Greek">Greek</option>
          <option value="French">French</option>
          <option value="Chinese">Chinese</option>
        </select>

        <input
          type="number"
          min="1"
          step="1"
          placeholder="Max preparation time (minutes)"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          className="border border-gray-300 rounded p-2 outline-none transition-colors duration-200 hover:border-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={!isButtonEnabled}
          className={`p-2 rounded text-white transition-colors duration-200 ${
            isButtonEnabled
              ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
