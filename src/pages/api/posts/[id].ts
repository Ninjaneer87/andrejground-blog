import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const isProd = import.meta.env.PROD;

export type PostInfo = {
  id: string;
  viewsCount: number;
  likesCount: number;
};
const db = getFirestore(app);
const postsRef = db.collection('posts');

export const GET: APIRoute = async ({ params }) => {
  // if (isProd) {
  //   return new Response('Not yet available in PROD', {
  //     status: 404,
  //   });
  // }

  if (!params.id) {
    return new Response('Post id not provided', {
      status: 404,
    });
  }

  try {
    const post = await postsRef.doc(params.id).get();
    console.log({ post });

    // New post
    if (!post.exists) {
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

    const postData = post.data();

    // Existing post

    // Development - no views increment
    if (!isProd) {
      return new Response(
        JSON.stringify({
          id: post.id,
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
        id: post.id,
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
  if (isProd) {
    return new Response('Not yet available in PROD', {
      status: 404,
    });
  }

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
    const post = await postsRef.doc(params.id).get();

    if (!post.exists) {
      return new Response('Post does not exist', {
        status: 404,
      });
    }

    const postData = post.data();

    await postsRef.doc(params.id).update({
      likesCount: FieldValue.increment(likesIncrementValue),
    });

    return new Response(
      JSON.stringify({
        id: post.id,
        ...postData,
        likesCount: postData?.likesCount + 1,
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
