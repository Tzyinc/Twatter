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

  let userId;
  let username;
  let following = [];
  onMount(mountFn);
  async function mountFn() {
    userId = await initUUID();
    username = await getUsername();
    following = await getFollowing();
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

        const successEvent = new CustomEvent("twatFollow", {});
        window.dispatchEvent(successEvent);
        storeFollowing(following);
      }
    };
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

<twatCont>
  <div class="top">
    <div>
      <div class="name">{twat.username}</div>
      <div class="id">{twat.userId}</div>
    </div>
    <div class="time">{time}</div>
  </div>
  <div class="content">{twat.content}</div>
  <div>
    <button on:click={followName(twat.username)}>follow</button>
  </div>
</twatCont>

<!-- twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid -->
