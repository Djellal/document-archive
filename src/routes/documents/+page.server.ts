import { pb } from '$lib/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    return {
      status: 302,
      redirect: '/auth'
    };
  }

  const documents = await pb.collection('documents').getList(1, 50, {
    sort: '-created'
  });

  return {
    documents: documents.items
  };
};