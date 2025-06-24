import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_API_KEY!;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function GET(request: NextRequest) {
  const urlParts = request.nextUrl.pathname.split('/');
  const id = urlParts.at(-1);

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Spoonacular API error:',
        error.response?.data || error.message,
      );
      const status = error.response?.status || 500;
      return NextResponse.json({ error: 'Failed to fetch recipe' }, { status });
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 },
    );
  }
}
