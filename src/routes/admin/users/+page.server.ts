import { pb } from '$lib/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user?.role !== 'administrator') {
		return {
			status: 403,
			error: new Error('Unauthorized')
		};
	}

	const users = await pb.collection('users').getList(1, 50);

	return {
		users: users.items
	};
};