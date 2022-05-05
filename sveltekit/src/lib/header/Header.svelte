<script lang="ts">
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import { page } from '$app/stores';
	import Card from '@smui/card'
	import TopAppBar, {
	  Row,
	  Section,
	  Title,
	  AutoAdjust,
	} from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button'
	import Tab, { Icon, Label } from '@smui/tab';
  	import TabBar from '@smui/tab-bar';

	let topAppBar: TopAppBarComponentDev;
 
	let tabs = [
		{
			icon: 'access_time',
			label: 'Planifier un voyage',
			redirect: '/planifier',
		},
		{
			icon: 'near_me',
			label: 'Voyager',
			redirect: '/about',
		},
		{
			icon: 'favorite',
			label: 'Mes voyages',
			redirect: '/',
		},
		{
			icon: 'favorite',
			label: 'Mes voyages',
			redirect: '/',
		},
		{
			icon: 'favorite',
			label: 'Mes voyages',
			redirect: '/',
		},
	];

	const pathname =  $page.url.pathname
	let active = tabs[tabs.findIndex(tab => tab.redirect === pathname)]
	
	console.log('active:', active)
</script>


<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
	  <Section>
		<IconButton class="material-icons">menu</IconButton>
		<Title>RoadTriper</Title>
	  </Section>
	  
	  <Section align="end" toolbar>
		<IconButton class="material-icons" aria-label="Download"
		  >file_download</IconButton
		>
		<IconButton class="material-icons" aria-label="Print this page"
		  >print</IconButton
		>
		<IconButton class="material-icons" aria-label="Bookmark this page"
		  >bookmark</IconButton
		>
	  </Section>
	</Row>
	<Card class='test' >
		<TabBar {tabs} let:tab bind:active>
			<!-- <a sveltekit:prefetch href={tab.redirect}>About</a> -->
			<Tab class="tabs" {tab}  href={tab.redirect} >
				<Icon class="material-icons">{tab.icon}</Icon>
				<Label>{tab.label}</Label>
			</Tab>
		</TabBar>
	</Card>
</TopAppBar>
   
<style>
/* Hide everything above this component. */
:global(app),
:global(body),
:global(html) {
	display: block !important;
	height: auto !important;
	width: auto !important;
	position: static !important;
}
</style>



<!-- <script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script> -->

<!-- <header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === '/todos'}>
				<a sveltekit:prefetch href="/todos">Todos</a>
			</li>
			<li class:active={$page.url.pathname === '/test'}>
				<a sveltekit:prefetch href="/test">Test</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
	</div>
</header> -->

<!-- <style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style> -->

