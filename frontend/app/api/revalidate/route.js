import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req) {
  try {
    const { body, isValidSignature } = await parseBody(req, process.env.SANITY_REVALIDATE_SECRET);
    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(message, { status: 401 });
    }
    if (!body?._type) {
      console.error('Missing _type in body of revalidate request');
      return new Response('Bad Request', { status: 400 });
    }
    // console.log('Revalidating...', body);
    await revalidateTag(body._type);
    if (body.slug) {
      await revalidateTag(`${body._type}:${body.slug}`);
    }
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
