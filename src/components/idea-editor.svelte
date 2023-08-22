<script>
  import { colors } from "../domain";
  import { saveIdea } from "../database";
  const randomColor = Math.floor(Math.random() * colors.length);

  /** @type {import("../domain").Idea} */
  export let idea = {
    title: "",
    content: "",
    growth: 0,
    label: randomColor,
    createdAt: new Date(),
    updatedAt: new Date(),
    viewedAt: new Date(),
  };

  /** @param {number} id */
  export let onSave = (id) => {};

  /** @type {Promise<any> | null} */
  let savePromise = null;

  function onSaveHandler() {
    idea.updatedAt = new Date();
    savePromise = saveIdea(idea);
    savePromise.then((id) => {
      setTimeout(() => savePromise = null, 500);
      idea.id = id;
      onSave(id);
    });

    return savePromise;
  }
</script>

<div class="flex gap-2">
  <div class="w-3/4 bg-slate-600 rounded-lg">
    <input bind:value={idea.title} placeholder="Title" type="text" class="w-full text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-amber-600 outline-none p-2 placeholder:text-slate-400" />
  </div>
  <select bind:value={idea.label} class="w-1/4 p-2 rounded-md bg-{colors[idea.label]}-200 text-slate-600">
    {#each colors as color, colorIdx}
      <option value={colorIdx} class="bg-{color}-200">{color.charAt(0).toLocaleUpperCase()}{color.substring(1)}</option>
    {/each}
  </select>
</div>
<textarea bind:value={idea.content} placeholder="Content" class="w-full resize-none outline-none p-2 rounded-lg bg-slate-600 placeholder:text-slate-400" style="height: calc(100% - 100px)"></textarea>
{#if savePromise}
  {#await savePromise}
    <button disabled class="py-3 px-5 bg-gradient-to-r from-sprout1 to-sprout4 text-slate-700 rounded-lg shadow-lg">
      Saving
    </button>
  {:then _id}
    <button class="py-3 px-5 bg-gradient-to-r from-sprout1 to-sprout4 text-slate-700 rounded-lg shadow-lg">
      🥳 Saved
    </button>
  {/await}
{:else}
  <button on:click={onSaveHandler} class="py-3 px-5 bg-gradient-to-r from-sprout1 to-sprout4 text-slate-700 rounded-lg shadow-lg">
    🥳 Save
  </button>
{/if}




