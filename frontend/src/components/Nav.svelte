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
	}

	.item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		height: 40px;
		margin-right: 10px;
	}

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 0;
		padding: 5px;
		height: 40px;
	}

	a {
		text-decoration: none;
		display: block;
	}
</style>

<nav>
	<div class=container>
		<div class=item>
			<a rel=prefetch aria-current='{segment === "/" ? "page" : undefined}' href='/'><Logo /></a>
			<h1>
		 		{displayTitle}
			</h1>
		</div>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<div>
			<a rel=prefetch aria-current='{segment === "following" ? "page" : undefined}' href='following'>following</a>
		</div>
	</div>
</nav>
