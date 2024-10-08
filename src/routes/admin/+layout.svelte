<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	$: if ($page.data.user?.role !== 'administrator') {
		throw new Error('Unauthorized');
	}
</script>

<nav>
	<a href="/admin/users">{$_('manageUsers')}</a>
	<a href="/admin/documents">{$_('manageDocuments')}</a>
</nav>

<slot />