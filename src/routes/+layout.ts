import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  if (!pb.authStore.isValid && url.pathname !== '/auth') {
    throw redirect(303, '/auth');
  }
};