<script>
  import {generateAllPalettes, allHues, twClasses} from './lib';
  import {onMount} from 'svelte';


  let hue = 0;
  let interval;
  let dir = true;

  const onChange = (e) => {
    if(e.detail) {
    (hue = e.detail)}};
  
  $: palettes = generateAllPalettes(hue);
  $: allColors = allHues();

  console.log(allColors)
</script>

<main class='flex flex-col gap-5 m-16'>
  <div class="flex gap-5 justify-center items-center">
    <label class='flex grow flex-col gap-2 mb-6 font-bold'>
      Hue {hue}
      <hue-picker class="block" {hue} step="10" on:input={onChange} />
    </label>

  </div>
 <div class='grid auto-cols-auto gap-1 grid-cols-12'>
  {#each allColors as color}
<div class='w-full block h-8 w-8' style="background-color: {color}"></div>
  {/each}
 </div>
  {#each palettes as {paletteArray, label}}
    <div>
      <h2 class='text-center text-slate-600 text-sm mb-2'>{label}</h2>
      {#each paletteArray as palette}
        <div class='flex h-8'>
          {#each palette as color}
            <div class='w-full grow' style="background-color: {color}"></div>
          {/each}
        </div>
      {/each}
    </div>
  {/each}

  <div>
    <h2 class='text-center text-slate-600 text-sm mb-2'>Tailwind</h2>
    {#each twClasses as palette}
      <div class='flex h-8'>
        {#each palette as color}
          <div class='w-full grow {color}'></div>
        {/each}
      </div>
    {/each}
  </div>

</main>
