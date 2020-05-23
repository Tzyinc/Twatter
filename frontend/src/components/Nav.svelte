<script>
	import Logo from './Logo.svelte';
	export let segment;
	let displayTitle = 'asdf';
	$: {
		switch (segment) {
			case undefined:
				displayTitle = 'Home'
				break;
			case 'following':
				displayTitle = 'Following'
				break;
			default:
				displayTitle = '404: Not found'
		}
	}
</script>

<style>
	nav {
		border-bottom: 0.5px solid #ccc;
		font-weight: 300;
		padding: 0 1em;
		align-items: center;
		justify-content: center;
	}

	.item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 0;
		padding: 0.5em;
		height: 2em;
	}

	a {
		text-decoration: none;
		display: block;
	}
	.title {
		margin: 0;
		margin-left: 1em;
		/* font-size: 1em; */
		/* font-weight: bold; */
	}
</style>

<nav>
	<div class=container>
		<div class=item>
			<a rel=prefetch aria-current='{segment === "/" ? "page" : undefined}' href='/'><Logo /></a>
			<h2 class=title>
		 		{displayTitle}
			</h2>
		</div>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<div class=item>
			<a rel=prefetch aria-current='{segment === "following" ? "page" : undefined}' href='following'>Following</a>
		</div>
	</div>
</nav>
