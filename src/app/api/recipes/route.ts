import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_API_KEY!;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const cuisine = searchParams.get('cuisine');
  const maxReadyTime = searchParams.get('maxReadyTime');

  try {
    const params: Record<string, string | number> = {
      apiKey: API_KEY,
    };
    if (query) params.query = query;
    if (cuisine) params.cuisine = cuisine;
    if (maxReadyTime) params.maxReadyTime = maxReadyTime;

    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });

    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 },
    );
  }
}
