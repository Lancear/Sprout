<script>
  import IdeaCard from "../components/idea-card-focused.svelte";
  import { getAllIdeas } from "../database";

  const allIdeasPromise = getAllIdeas();
  $: filteredIdeas = allIdeasPromise.then(ideas => ideas.sort((a, b) => a.viewedAt.getTime() - b.viewedAt.getTime()).slice(0, 3));
</script>

<div class="relative p-4 h-full overflow-hidden">
  <h1 class="mt-24 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-amber-600">🌱 Sprout</h1>
  <p class="mt-3 text-xl italic text-sprout5">Where ideas sprout and grow!</p>
  <h2 class="mt-24 mb-1 text-xl text-sprout1">💭 Todays focus</h2>
  {#await filteredIdeas}
    Loading ideas...
  {:then ideas}
    <div class="flex flex-col gap-2">
      {#each ideas as idea}
        <IdeaCard idea={idea} />
      {/each}
    </div>
  {:catch error}
    <p>🧇 Seems like something went wrong: {error?.message}</p>
  {/await}
  <a href="/ideas/new" class="absolute bottom-4 right-4 py-3 px-5 bg-gradient-to-r from-sprout1 to-sprout4 text-slate-700 rounded-lg shadow-lg">
    🌱 Sprout
  </a>
</div>

