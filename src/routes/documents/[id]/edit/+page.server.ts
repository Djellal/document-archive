import { pb } from '$lib/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    return {
      status: 302,
      redirect: '/auth'
    };
  }

  const document = await pb.collection('documents').getOne(params.id);

  return {
    document
  };
};