<script lang="ts">
  import { _ } from 'svelte-i18n';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ document } = data);
</script>

<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  <h1 class="text-3xl font-bold mb-6">{document.code}</h1>

  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {$_('documents.details')}
      </h3>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            {$_('documents.category')}
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {document.category}
          </dd>
        </div>
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
  </div>

  <div class="mt-6">
    <a href="/documents/{document.id}/edit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
      {$_('documents.edit')}
    </a>
  </div>
</div>