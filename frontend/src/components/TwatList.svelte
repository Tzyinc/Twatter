<script>

  import { onMount } from "svelte";
  import Twat from './Twat.svelte';
  let twats = [];

  onMount(twatSuccess);
  async function twatSuccess() {
    const res = await fetch(`http://localhost:3030/`);
    const twatResponse = await res.json();
    twats = twatResponse.twats;
  }
</script>

<style>
</style>

<svelte:window on:twatSuccess={twatSuccess}></svelte:window>
{#each twats as twat}
  <Twat twat={twat} />
{/each}
