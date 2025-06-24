'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full rounded mb-4"
      />

      <div
        className="mb-4 prose"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      <h2 className="text-2xl font-semibold mt-6 mb-2">Ingredients</h2>
      <ul className="list-disc list-inside space-y-1">
        {recipe.extendedIngredients?.map((ingredient: Ingredient) => (
          <li key={ingredient.id}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
