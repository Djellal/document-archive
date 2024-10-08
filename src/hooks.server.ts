import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
	event.locals.lang = lang as 'en' | 'ar' | 'fr';
	locale.set(lang);

	// TODO: Implement user authentication and set event.locals.user

	return resolve(event);
};