<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { pb } from '$lib/pocketbase';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ document } = data);

  let code = document.code;
  let category = document.category;
  let description = document.description;
  let archiveDate = new Date(document.archiveDate).toISOString().split('T')[0];
  let error = '';

  async function updateDocument() {
    try {
      await pb.collection('documents').update(document.id, {
        code,
        category,
        description,
        archiveDate
      });
      goto('/documents');
    } catch (e) {
      error = $_('documents.updateError');
    }
  }
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <h1 class="text-3xl font-bold mb-6">{$_('documents.editDocument')}</h1>

  <form on:submit|preventDefault={updateDocument} class="space-y-6">
    <div>
      <label for="code" class="block text-sm font-medium text-gray-700">{$_('documents.code')}</label>
      <input type="text" id="code" bind:value={code} required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-700">{$_('documents.category')}</label>
      <input type="text" id="category" bind:value={category} required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">{$_('documents.description')}</label>
      <textarea id="description" bind:value={description} rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
    </div>

    <div>
      <label for="archiveDate" class="block text-sm font-medium text-gray-700">{$_('documents.archiveDate')}</label>
      <input type="date" id="archiveDate" bind:value={archiveDate} required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>

    {#if error}
      <p class="text-red-600">{error}</p>
    {/if}

    <div>
      <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {$_('documents.update')}
      </button>
    </div>
  </form>
</div>