<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { init, addMessages, getLocaleFromNavigator } from 'svelte-i18n';
  import { pb } from '$lib/pocketbase';
  import { goto } from '$app/navigation';
  import en from '$lib/i18n/en.json';
  import ar from '$lib/i18n/ar.json';
  import fr from '$lib/i18n/fr.json';

  onMount(() => {
    addMessages('en', en);
    addMessages('ar', ar);
    addMessages('fr', fr);

    init({
      fallbackLocale: 'en',
      initialLocale: getLocaleFromNavigator(),
    });
  });

  function logout() {
    pb.authStore.clear();
    goto('/auth');
  }
</script>

{#if $page.url.pathname !== '/auth'}
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="/documents" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Documents</a>
              {#if pb.authStore.model?.role === 'administrator'}
                <a href="/admin" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin</a>
              {/if}
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button on:click={logout} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
{/if}

<main>
  <slot />
</main>