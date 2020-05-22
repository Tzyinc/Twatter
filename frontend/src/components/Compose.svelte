<script>
  import {
    getUUID,
    storeUUID,
    getUsername,
    storeUsername
  } from "../_storage.js";
  import { onMount } from "svelte";
  let username = "";
  let content = "";
  let userId = "";

  onMount(async () => {
    userId = getUUID();
    if (userId) {
      username = getUsername();
    } else {
      fetch(`http://localhost:3030/getUUID`)
        .then(res => res.json())
        .then(uuidRes => {
          storeUUID(uuidRes.id);
          userId = uuidRes.id;
        });
    }
  });

  async function sendTweet() {
    const res = await fetch(
      `http://localhost:3030/createTwat?username=${username}&userId=${userId}&content=${content}`
    );
    const sendTweetObj = await res.json();
    console.log(sendTweetObj)
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
  }
</style>

<compose>
  <input bind:value={username} on:change={updateUsername} />
  <input bind:value={content} />
  <button on:click={sendTweet}>send</button>

</compose>

<!-- twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid -->
