<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { pb } from '$lib/pocketbase';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ users } = data);

	async function addUser(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			await pb.collection('users').create(formData);
			// Refresh the user list
			users = await pb.collection('users').getList(1, 50);
		} catch (error) {
			console.error('Error adding user:', error);
		}
	}
</script>

<h1>{$_('manageUsers')}</h1>

<form on:submit={addUser}>
	<input name="email" type="email" required placeholder={$_('email')} />
	<input name="password" type="password" required placeholder={$_('password')} />
	<select name="role" required>
		<option value="administrator">{$_('administrator')}</option>
		<option value="editor">{$_('editor')}</option>
		<option value="regular">{$_('regularUser')}</option>
	</select>
	<button type="submit">{$_('addUser')}</button>
</form>

<ul>
	{#each users as user}
		<li>
			{user.email} - {user.role}
			<button on:click={() => {/* TODO: Implement user editing */}}>{$_('edit')}</button>
			<button on:click={() => {/* TODO: Implement user deletion */}}>{$_('delete')}</button>
		</li>
	{/each}
</ul>