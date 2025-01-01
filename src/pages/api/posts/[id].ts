import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getCollection } from 'astro:content';
import { ALLOWED_ORIGINS } from 'src/utils/config';

const isProd = import.meta.env.PROD;

const allActivePostIds = (await getCollection('blog'))
  .filter(entry => !entry.data.isDraft)
  .map(entry => entry.id);

async function checkIfPostExists(id: string) {
  return allActivePostIds.some(postId => postId === id);
}

function handleUnsupportedHosts(request: Request) {
  // Check referrer
  const referrer = request.headers.get('referer');
  if (!referrer) {
    return new Response('Protected route', {
      status: 400,
    });
  }

  // Check host
  const host = new URL(referrer).host;
  if (!ALLOWED_ORIGINS.includes(host)) {
    return new Response('Protected route', {
      status: 400,
    });
  }
}

export type PostInfo = {
  id: string;
  viewsCount: number;
  likesCount: number;
};
const db = getFirestore(app);
const postsRef = db.collection('posts');

export const GET: APIRoute = async ({ params, request }) => {
  handleUnsupportedHosts(request);

  if (!params.id) {
    return new Response('Post id not provided', {
      status: 404,
    });
  }

  try {
    const postSnapshot = await postsRef.doc(params.id).get();

    if (!postSnapshot.exists) {
      const postExists = await checkIfPostExists(params.id);
      if (!postExists) {
        return new Response('Post does not exist', {
          status: 404,
        });
      }

      // New post
      await postsRef.doc(params.id).set({
        viewsCount: 1,
        likesCount: 0,
      });

      return new Response(
        JSON.stringify({
          id: params.id,
          viewsCount: 1,
          likesCount: 0,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const postData = postSnapshot.data();

    // Existing post

    // Development - no views increment
    if (!isProd) {
      return new Response(
        JSON.stringify({
          id: postSnapshot.id,
          ...postData,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // Production
    await postsRef.doc(params.id).update({
      viewsCount: FieldValue.increment(1),
    });

    return new Response(
      JSON.stringify({
        id: postSnapshot.id,
        ...postData,
        viewsCount: postData?.viewsCount + 1,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  handleUnsupportedHosts(request);

  const formData = await request.formData();

  const incrementLikes = formData.get('incrementLikes');
  const decrementLikes = formData.get('decrementLikes');

  let likesIncrementValue = 0;
  if (incrementLikes) {
    likesIncrementValue = 1;
  }
  if (decrementLikes) {
    likesIncrementValue = -1;
  }

  if (!likesIncrementValue) {
    return new Response('Missing fields', {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response('Post id not provided', {
      status: 404,
    });
  }

  try {
    const postSnapshot = await postsRef.doc(params.id).get();

    if (!postSnapshot.exists) {
      return new Response('Post does not exist', {
        status: 404,
      });
    }

    const postData = postSnapshot.data();

    await postsRef.doc(params.id).update({
      likesCount: FieldValue.increment(likesIncrementValue),
    });

    return new Response(
      JSON.stringify({
        id: postSnapshot.id,
        ...postData,
        likesCount: postData?.likesCount + likesIncrementValue,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
