<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>OpenTwig - Free & Open Source Link in Bio Generator</title>
	<meta name="description" content="Create beautiful, customizable link in bio pages. OpenTwig is a free, open-source CLI tool that generates static pages you own and control." />
	<meta name="keywords" content="link in bio, bio page, linktree alternative, open source, static site generator, CLI tool" />
	<meta name="author" content="Tufan Tunç" />
	<meta property="og:title" content="OpenTwig - Free & Open Source Link in Bio Generator" />
	<meta property="og:description" content="Create beautiful, customizable link in bio pages. OpenTwig is a free, open-source CLI tool." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://opentwig.dev" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="OpenTwig - Free & Open Source Link in Bio Generator" />
	<meta name="twitter:description" content="Create beautiful, customizable link in bio pages with OpenTwig." />
</svelte:head>

{@render children()}
