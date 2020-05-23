<script>
  import { getUsername, storeUsername, initUUID } from "../_storage.js";
  import { onMount } from "svelte";
  import { backendURL } from "../_beroute";
  let username = "";
  let content = "";
  let userId = "";
  export let parentTwat;
  export let exitReply;

  onMount(refreshUsername);

  async function refreshUsername() {
    userId = await initUUID();
    username = getUsername();
  }

  async function sendTweet() {
    let res;
    if (!parentTwat) {
      res = await fetch(
        `${backendURL}createTwat?username=${username}&userId=${userId}&content=${content}`
      );
    } else {
      res = await fetch(
        `${backendURL}createTwat?username=${username}&userId=${userId}&content=${content}&parentid=${parentTwat}`
      );
    }
    const sendTweetObj = await res.json();
    if (sendTweetObj.success) {
      if (typeof exitReply === "function") {
        exitReply();
      }
      const successEvent = new CustomEvent("twatSuccess", {});
      window.dispatchEvent(successEvent);
    }
  }

  function updateUsername(e) {
    let value = e.target.value;
    storeUsername(value);
  }
</script>

<style>
  compose {
    border: 0.5px solid #ccc;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .username {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    word-wrap: break-word;
    width: 100%;
  }
</style>

<svelte:window on:usernameChanged={refreshUsername} />

<compose>
  <div class="username">
    <div>Twat under:</div>
    <input bind:value={username} on:change={updateUsername} />
  </div>
  <div class="content">
    <input bind:value={content} />
    <button on:click={sendTweet}>send</button>
  </div>

</compose>

<!-- twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid -->
