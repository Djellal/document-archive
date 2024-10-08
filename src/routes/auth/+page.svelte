<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';

  let email = '';
  let password = '';
  let error = '';

  async function login() {
    try {
      await pb.collection('users').authWithPassword(email, password);
      goto('/');
    } catch (e) {
      error = 'Invalid email or password';
    }
  }

  async function register() {
    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        role: 'regular'
      });
      await login();
    } catch (e) {
      error = 'Registration failed. Please try again.';
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {$_('auth.title')}
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={login}>
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">{$_('auth.email')}</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required bind:value={email} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={$_('auth.email')}>
        </div>
        <div>
          <label for="password" class="sr-only">{$_('auth.password')}</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required bind:value={password} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={$_('auth.password')}>
        </div>
      </div>

      {#if error}
        <p class="mt-2 text-center text-sm text-red-600">
          {error}
        </p>
      {/if}

      <div class="flex items-center justify-between">
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {$_('auth.login')}
        </button>
      </div>
    </form>
    <div class="text-center">
      <button on:click={register} class="font-medium text-indigo-600 hover:text-indigo-500">
        {$_('auth.register')}
      </button>
    </div>
  </div>
</div>