<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { pb } from '$lib/pocketbase';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ documents } = data);

  async function deleteDocument(id: string) {
    if (confirm($_('documents.confirmDelete'))) {
      await pb.collection('documents').delete(id);
      documents = documents.filter(doc => doc.id !== id);
    }
  }
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <h1 class="text-3xl font-bold mb-6">{$_('documents.title')}</h1>

  <a href="/documents/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
    {$_('documents.addNew')}
  </a>

  {#if documents.length === 0}
    <p>{$_('documents.noDocuments')}</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each documents as document}
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {document.code}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              {document.category}
            </p>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {$_('documents.description')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {document.description}
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {$_('documents.archiveDate')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(document.archiveDate).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <a href="/documents/{document.id}" class="text-indigo-600 hover:text-indigo-900 mr-2">
              {$_('documents.view')}
            </a>
            <a href="/documents/{document.id}/edit" class="text-indigo-600 hover:text-indigo-900 mr-2">
              {$_('documents.edit')}
            </a>
            <button on:click={() => deleteDocument(document.id)} class="text-red-600 hover:text-red-900">
              {$_('documents.delete')}
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>