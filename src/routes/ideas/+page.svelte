<script>
  import IdeaCardSmall from "../../components/idea-card.svelte";
  import { colors, states } from '../../domain';
  import { getAllIdeas } from '../../database';
  
  let search = "";
  /** @type {number|null} */
  let selectedGrowth = null;
  /** @type {number|null} */
  let selectedColor = null;
  
  const allIdeasPromise = getAllIdeas();
  $: filteredIdeas = allIdeasPromise.then(ideas => ideas.filter((idea) => {
    if (selectedGrowth && idea.growth !== selectedGrowth) return false;
    if (selectedColor && idea.label !== selectedColor) return false;
    return idea.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  }));
</script>

<div class="m-4 mb-2">
  <input bind:value={search} placeholder="Search" type="search" class="w-full outline-none p-2 rounded-lg {search ? 'bg-slate-700' : 'bg-slate-600'} placeholder:text-slate-400" />
  <select bind:value={selectedGrowth} class="w-1/9 mt-2 p-1 text-sm rounded-md {selectedGrowth ? 'bg-slate-700' : 'bg-slate-600'} text-slate-400">
    <option value={null}>Growth</option>
    {#each states as state}
      <option value={state.value}>{state.title}</option>
    {/each}
  </select>
  <select bind:value={selectedColor} class="w-1/4 mt-2 p-1 text-sm rounded-md bg-{selectedColor !== null ? `${colors[selectedColor]}-200 text-slate-600` : 'slate-600 text-slate-400'}">
    <option value={null} class="bg-slate-600 text-slate-400">All Colors</option>
    {#each colors as color, colorIdx}
      <option value={colorIdx} class="bg-{color}-200">{color.charAt(0).toLocaleUpperCase()}{color.substring(1)}</option>
    {/each}
  </select>
</div>

{#await filteredIdeas}
  Loading ideas...
{:then ideas}
  <div class="overflow-auto flex flex-wrap gap-2 p-4 justify-center" style="max-height: calc(100% - 92px)">
    {#each ideas as idea}
      <IdeaCardSmall idea={idea} />
    {/each}
  </div>
{:catch error}
  <p>🧇 Seems like something went wrong: {error?.message}</p>
{/await}
