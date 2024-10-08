// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lang: 'en' | 'ar' | 'fr';
			user: {
				id: string;
				email: string;
				role: 'administrator' | 'editor' | 'regular';
			} | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};