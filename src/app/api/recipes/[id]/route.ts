import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_API_KEY!;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 },
    );
  }
}
