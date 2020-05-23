<script>
  import { onMount } from "svelte";
  import Twat from "./Twat.svelte";
  import { stores } from "@sapper/app";
  import { backendURL } from "../_beroute";
  import {
    getUsername,
    initUUID,
    getFollowing,
    storeFollowing
  } from "../_storage.js";

  const { page } = stores();
  let path = $page.path;
  let query = $page.query;

  let twats = [];

  let username = "";
  let userId = "";
  let following = [];
  let hasMore = false;
  let offset = 0;
  let limit = 10;

  onMount(twatSuccess);
  async function twatSuccess() {
    userId = await initUUID();
    username = await getUsername();
    following = await getFollowing();

    let res, twatResponse;
    let queryparams = "";
    if (query.offset !== undefined) {
      queryparams += `&offset=${query.offset}`;
      offset = query.offset;
    }
    if (query.limit !== undefined) {
      queryparams += `&limit=${query.limit}`;
      limit = query.limit;
    }
    switch (path) {
      case "/following":
        res = await fetch(
          `${backendURL}getTwatByUsernames?usernames=${JSON.stringify(
            following
          )}${queryparams}`
        );
        twatResponse = await res.json();
        break;
      case "/":
      //fallsthrough
      default:
        res = await fetch(`${backendURL}?${queryparams}`);
        twatResponse = await res.json();
        break;
    }
    twats = twatResponse.twats;
    hasMore = twatResponse.hasMore;
  }
  async function fetchMore() {
    userId = await initUUID();
    username = await getUsername();
    following = await getFollowing();

    let res, twatResponse;
    let queryparams = "";

    offset = offset + limit;
    limit += limit;
    queryparams += `&offset=${offset}`;
    queryparams += `&limit=${limit}`;
    switch (path) {
      case "/following":
        res = await fetch(
          `${backendURL}getTwatByUsernames?usernames=${JSON.stringify(
            following
          )}${queryparams}`
        );
        twatResponse = await res.json();
        break;
      case "/":
      //fallsthrough
      default:
        res = await fetch(`${backendURL}?${queryparams}`);
        twatResponse = await res.json();
        break;
    }
    twats = twats.concat(twatResponse.twats);
    hasMore = twatResponse.hasMore;
  }
</script>

<style>

</style>

<svelte:window on:twatSuccess={twatSuccess} on:twatFollow={twatSuccess} />
{#if path === '/following' && following.length <= 0}
  <div>
    you are not following anybody follow by adding people from the home page
  </div>
{/if}
{#each twats as twat}
  <Twat {twat} />
{/each}
{#if hasMore}
  <div on:click={fetchMore}>see more</div>
{/if}
