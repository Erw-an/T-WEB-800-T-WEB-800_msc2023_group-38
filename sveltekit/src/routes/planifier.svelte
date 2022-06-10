<script type="ts">
	import Autocomplete from '@smui-extra/autocomplete';
	import {onMount} from 'svelte'
	import '../app.css';
	import Card, { Content } from '@smui/card';
	let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];
	let valueStart: string | undefined = undefined;
	let valueEnd: string | undefined = undefined;

	import Map from "$lib/map/Map2.svelte"
	 
	
	import mapboxgl from 'mapbox-gl'
	mapboxgl.accessToken = 'pk.eyJ1Ijoic3dlLWpvZWUiLCJhIjoiY2wzMnFlcXo1MDBsNTNjcXNpa3JrdzByZSJ9._H6XTxj4p2OFQ2DGMKENdw';

	onMount(() => {
        var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-74.5, 40],
			zoom: 9
		});
    });
	
</script>

<svelte:head>
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css' rel='stylesheet' />
</svelte:head>


	<div class="container">
		
			
				<!-- <div class="card">
					<Autocomplete
						options={fruits}
						textfield$variant="outlined"
						bind:value={valueStart}
						label="Depart"
					/>
					<Autocomplete
						options={fruits}
						textfield$variant="outlined"
						bind:value={valueEnd}
						label="Arriver"
					/>
					
				</div> -->
				

				<div class="map" style='width: 100%; height: 100%;'>
					<!-- <div class="top-map"></div> -->
					<Map></Map>
				</div>

		
	</div>





<style>
	.card{
		display: flex;
		justify-content: space-between;
		height: 100%;
		width: 100%;
	}
	.map{
		width: 100%;
		height: 100%;
		background-color: azure;
		margin-top: 250px;
		padding-top: 250px;
	}

	.top-map{
		margin-top: 100px;
	}

	.container{
		width: 100%;
		height: 100%;
		display: flex;
		margin-top: 250px;
		padding-top: 250px;
		display: flex;
	}
	
</style>