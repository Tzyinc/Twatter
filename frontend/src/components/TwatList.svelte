<script>
  import { onMount } from "svelte";
  import Twat from "./Twat.svelte";
  import { stores } from "@sapper/app";
  import {
    getUsername,
    initUUID,
    getFollowing,
    storeFollowing
  } from "../_storage.js";

  const { page } = stores();
  let path;
  $:path = $page.path;

  let twats = [];

  let username = "";
  let userId = "";
  let following = [];

  onMount(twatSuccess);
  async function twatSuccess() {
    userId = await initUUID();
    username = await getUsername();
    following = await getFollowing();

    let res, twatResponse;
    switch (path) {
      case "/following":
        res = await fetch(
          `http://localhost:3030/getTwatByUsernames?usernames=${JSON.stringify(
            following
          )}`
        );
        twatResponse = await res.json();
        break;
      case "/":
      //fallsthrough
      default:
        res = await fetch(`http://localhost:3030/`);
        twatResponse = await res.json();
        break;
    }
    twats = twatResponse.twats;
  }
</script>

<style>

</style>

<svelte:window on:twatSuccess={twatSuccess} on:twatFollow={twatSuccess}/>
{#if path==='/following' && following.length <= 0}
  <div>
    you are not following anybody follow by adding people from the home page
  </div>
{/if}
{#each twats as twat}
  <Twat {twat} />
{/each}
