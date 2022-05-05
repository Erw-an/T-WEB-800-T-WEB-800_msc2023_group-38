<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete';

  let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];

  let valueStandard = undefined;
  let valueFilled = undefined;
  let valueOutlined = undefined;
</script>



<div>
  

  <div>
    <Autocomplete
      options={fruits}
      textfield$variant="outlined"
      bind:value={valueOutlined}
      label="Depart"
    />
      
    <pre class="status">Selected: {valueOutlined || ''}</pre>
  </div>
</div>


