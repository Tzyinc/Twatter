<script>
  import {
    getUsername,
    storeUsername,
    initUUID
  } from "../_storage.js";
  import { onMount } from "svelte";
  let username = "";
  let content = "";
  let userId = "";

  onMount(async () => {
    userId = await initUUID();
    username = getUsername();
  });

  async function sendTweet() {
    const res = await fetch(
      `http://localhost:3030/createTwat?username=${username}&userId=${userId}&content=${content}`
    );
    const sendTweetObj = await res.json();
    if (sendTweetObj.success) {
      const successEvent = new CustomEvent("twatSuccess", {});
      window.dispatchEvent(successEvent);
    }
  }

  function updateUsername(e) {
    let value = e.target.value;
    console.log("update", value);
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
      justify-content: space-between
  }

  .content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between
  }
</style>

<compose>
  <div class=username>
    <div>Twat under:</div>
    <input bind:value={username} on:change={updateUsername} />
  </div>
  <div class=content>
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
