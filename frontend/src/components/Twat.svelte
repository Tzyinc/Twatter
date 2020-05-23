<script>
  export let twat;
  let time;

  import {
    getUsername,
    initUUID,
    getFollowing,
    storeFollowing
  } from "../_storage.js";
  import { onMount } from "svelte";
  import Compose from "./Compose.svelte";
  import { backendURL } from "../_beroute";

  let userId;
  let username;
  let following = [];
  let followText = "";
  let replyField = false;
  let parentTwat;
  let parentTwatTime = "";

  onMount(mountFn);
  async function mountFn() {
    userId = await initUUID();
    username = await getUsername();
    await checkIsTwatByUser();
    await fetchParentTwat();
  }

  async function checkIsTwatByUser() {
    following = await getFollowing();
    if (following.findIndex(item => item === twat.username) !== -1) {
      followText = "unfollow";
    } else {
      followText = "follow";
    }
    if (username === twat.username) {
      followText = "";
    }
  }

  async function fetchParentTwat() {
    if (!!twat.parentid) {
      let res = await fetch(`${backendURL}getTwatById?twatid=${twat.parentid}`);
      let twatResponse = await res.json();
      if (twatResponse.success && twatResponse.twats.length > 0) {
          parentTwat = twatResponse.twats[0];
          parentTwatTime = formatDate(parentTwat.timestamp);
      }
    }
  }

  function followName(followUser) {
    return function(event) {
      if (followUser !== username) {
        let followIndex = following.findIndex(user => user === followUser);
        if (followIndex === -1) {
          following.push(followUser);
        } else {
          following.splice(followIndex, 1);
        }
        storeFollowing(following);
      }
    };
  }

  function activateReply() {
    replyField = true;
  }

  function exitReply() {
    replyField = false;
  }

  function formatDate(timestamp) {
    let now = new Date();
    let date = new Date(timestamp);
    let deltaDate = now - date;
    if (deltaDate >= 86400 * 1000) {
      const MONTHS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return `${date.getDate()} ${
        MONTHS[date.getMonth()]
      } ${date.getFullYear()}`;
    } else if (deltaDate >= 3600 * 1000) {
      return `${Math.floor(deltaDate / (3600 * 1000))}h`;
    } else if (deltaDate >= 60 * 1000) {
      return `${Math.floor(deltaDate / (60 * 1000))}mins`;
    } else {
      return `just now`;
    }
  }
  $: time = formatDate(twat.timestamp);
</script>

<style>
  twatCont {
    border: 0.5px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
  }

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .name {
    padding: 0.5em;
    padding-bottom: 0;
    font-weight: bold;
  }
  .id {
    font-size: 0.5em;
    padding: 0.5em;
    padding-top: 0;
    color: #ccc;
  }

  .time {
    padding: 0.5em;
  }
  .content {
    width: 100%;
    padding: 0.5em;
  }
</style>

<svelte:window
  on:usernameChanged={checkIsTwatByUser}
  on:twatFollow={checkIsTwatByUser} />

<twatCont>
  <div class="top">
    <div>
      <div class="name">{twat.username}</div>
      <div class="id">{twat.userId}</div>
    </div>
    <div class="time">{time}</div>
  </div>
  <div class="content">{twat.content}</div>
  {#if parentTwat !== undefined}
  <div class="parent"> <div class="top">
    <div>
      <div class="name">{parentTwat.username}</div>
      <div class="id">{parentTwat.userId}</div>
    </div>
    <div class="time">{parentTwatTime}</div>
  </div>
  <div class="content">{parentTwat.content}</div></div>
  {/if}
  <div>
    <button on:click={activateReply}>reply</button>
    {#if !!followText}
      <button on:click={followName(twat.username)}>{followText}</button>
    {/if}
  </div>

  {#if !!replyField}
    <div>
      <button on:click={exitReply}>exit</button>
      <Compose parentTwat={twat.twatId} {exitReply} />
    </div>
  {/if}
</twatCont>

<!-- twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid -->
