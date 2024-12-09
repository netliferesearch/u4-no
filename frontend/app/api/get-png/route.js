import { NextResponse } from 'next/server';
import axios from 'axios';

const debug = true;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get('assetId');
  const actualUrl = `${process.env.THUMBNAIL_GENERATOR_URL}?assetId=${assetId}`;
  debug && console.log('Fetching image from', actualUrl);
  try {
    const response = await axios({
      url: actualUrl,
      method: 'GET',
      responseType: 'stream',
    });
    debug && console.log('Response from /api/get-png:', response);
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching the image', { status: 500 });
  }
}
