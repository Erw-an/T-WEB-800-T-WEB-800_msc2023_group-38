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
				</div>
			</Card>
		</div>
	</div>
</div>



<script lang="ts">
	import Autocomplete from '@smui-extra/autocomplete';
	import Card, { Content } from '@smui/card';
	let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];
	let valueStart: string | undefined = undefined;
	let valueEnd: string | undefined = undefined;
</script>

<style>
	.card{
		display: flex;
		justify-content: space-between;
	}
	
</style>