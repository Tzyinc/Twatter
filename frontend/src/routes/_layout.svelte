<script>
  import Nav from "../components/Nav.svelte";
  export let segment;
</script>

<style>
  :global(button) {
    background-color: #1ea1f2;
    color: white;
    font-size: 0.75em;
    padding: 0.5em 0.75em;
    border: none;
    border-radius: 2em;
	text-transform: capitalize;
	margin: 0.5em;
  }

  :global(input) {
    -webkit-appearance: none;
    box-sizing: border-box;
    padding: 0 0.5em;
    border-radius: 2em;
    font-size: 1em;
    border: 1px solid #00b8ff;
    color: #00b8ff;
    background: none;
    margin: 0;
  }

  :global(textarea) {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Ubuntu, "Helvetica Neue", sans-serif;
	padding: 0.5em;
	margin-bottom: 0.5em;
	border: none;
    border-bottom: 1px solid #00b8ff;
	outline: 0;
	width: 100%;
	height: 3em;
	resize: none;
  }
  main {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    position: relative;
    max-width: 500px;
    background-color: white;
    padding: 0;
    margin: 0 auto;
    border-left: 0.5px solid #ccc;
    border-right: 0.5px solid #ccc;
    box-sizing: border-box;
    min-height: 100vh;
  }
</style>

<main>
  <Nav {segment} />
  <slot />
</main>
