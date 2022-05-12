<script lang="ts">
	import Autocomplete from '@smui-extra/autocomplete';
	import Card, { Content } from '@smui/card';
	let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];
	let valueStart: string | undefined = undefined;
	let valueEnd: string | undefined = undefined;
	 
	// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
	// mapboxgl.accessToken = 'pk.eyJ1Ijoic3dlLWpvZWUiLCJhIjoiY2wzMnFlcXo1MDBsNTNjcXNpa3JrdzByZSJ9._H6XTxj4p2OFQ2DGMKENdw';
	// 	var map = new mapboxgl.Map({
	// 	container: 'map',
	// 	style: 'mapbox://styles/mapbox/streets-v11'
	// });
	
</script>

<svelte:head>
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css' rel='stylesheet' />
	<div id='map' style='width: 400px; height: 300px;'></div>
	<!-- MapBox -->
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js'></script>
	<script>
		mapboxgl.accessToken = 'pk.eyJ1Ijoic3dlLWpvZWUiLCJhIjoiY2wzMnFlcXo1MDBsNTNjcXNpa3JrdzByZSJ9._H6XTxj4p2OFQ2DGMKENdw';
		var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11'
		});
	</script>
</svelte:head>

<div class="columns margins">
	<div class="container">
		<div class="card-container">
			<Card>
				<div class="card">
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
					<div id='map'></div>
				</div>
				
			</Card>
			
		</div>
	</div>
</div>





<style>
	.card{
		display: flex;
		justify-content: space-between;
	}
	
</style>