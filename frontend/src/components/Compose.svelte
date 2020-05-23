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
    if (content.trim().length > 0 && content.trim().length <= 144) {
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
  }

  function updateUsername(e) {
    let value = e.target.value;
    storeUsername(value);
  }
</script>

<style>
  compose {
    border: 0.5px solid #ccc;
    width: calc(100% - 2em - 2px);
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .username {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .twatInput {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .alias {
    margin-right: 0.5em;
  }
  .textArea {
    width: 100%;
    min-width: 100%;
  }
  .twatButton {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
  }
  .red {
    color: red;
  }
  .grey {
    background-color: #999;
  }
</style>

<svelte:window on:usernameChanged={refreshUsername} />

<compose>
  <div class="username">
    <div class="alias">Twat Alias:</div>
    <input bind:value={username} on:change={updateUsername} />
  </div>
  <div class="twatInput">
    <textarea placeholder="twat it!" class="textArea" bind:value={content} />
    <div class="twatButton">
      <div class={content.trim().length > 144 ? 'red' : ''}>{content.trim().length}/144</div>
      <button class={content.trim().length > 144 ? 'grey' : ''} on:click={sendTweet}>
        Twat
      </button>
    </div>
  </div>

</compose>

<!-- twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid -->
