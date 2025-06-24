'use client';

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/recipes?${searchParams.toString()}`);
        const data = res.data;
        setRecipes(data);
      } catch (error) {
        console.error(error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      {recipes.length === 0 ? (
        <p>Unfortunately, no recipes were found for your request.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <div className="border rounded p-2 hover:shadow-lg flex flex-col max-w-sm">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h2
                  className="text-lg mt-2 overflow-hidden whitespace-nowrap text-ellipsis"
                  title={recipe.title}
                >
                  {recipe.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
