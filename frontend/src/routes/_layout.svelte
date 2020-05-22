<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
</script>

<style>
	main {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
		position: relative;
		max-width: 500px;
		background-color: white;
		padding: 0;
		margin: 0 auto;
		border-left: 0.5px solid #CCC;
		border-right: 0.5px solid #CCC;
		box-sizing: border-box;
		min-height: 100vh;
	}
</style>


<main>
	<Nav {segment}/>
	<slot></slot>
</main>