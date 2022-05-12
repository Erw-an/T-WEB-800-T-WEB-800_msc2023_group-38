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
	
	function redirect(redirect:string){
		location.href = redirect
	}
	

	
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
			<Tab class="tabs" {tab} on:click={() => redirect(tab.redirect)}>
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

