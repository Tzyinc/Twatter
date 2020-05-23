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
  .notFollowing {
    width: 100%;
    min-height: calc(100vh - 3em - 5px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .seeMore {

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<svelte:window on:twatSuccess={twatSuccess} on:twatFollow={twatSuccess} />
{#if path === '/following' && following.length <= 0}
  <div class="notFollowing">
    You are not following anybody! Follow by adding people from the home page!
  </div>
{/if}
{#each twats as twat(twat.twatId)}
  <Twat {twat} />
{/each}
{#if hasMore}
  <div class="seeMore">
    <button on:click={fetchMore}>see more</button>
  </div>
{/if}
