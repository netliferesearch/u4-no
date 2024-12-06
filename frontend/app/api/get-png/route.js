import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get('assetid');
  const actualUrl = `${process.env.THUMBNAIL_GENERATOR_URL}?assetid=${assetId}`;

  try {
    const response = await axios({
      url: actualUrl,
      method: 'GET',
      responseType: 'stream',
    });

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching the image', { status: 500 });
  }
}
