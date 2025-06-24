import { Suspense } from 'react';
import RecipesPage from '../recipes/components/RecipesPage';

export default function Recipes() {
  return (
    <Suspense fallback={<div className="p-4">Loading recipes...</div>}>
      <RecipesPage />
    </Suspense>
  );
}
