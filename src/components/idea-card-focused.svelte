<script>
  import { colors } from "../domain";
  import IdeaIcon from "./idea-icon.svelte";
  
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
</script>

<a href={`/ideas/${idea.id}`} class="flex flex-col p-3 shadow bg-slate-300 text-slate-600 rounded-lg hover:bg-lime-100 hover:bg-opacity-75">
  <div class="relative">
    <h3 class="my-1 text-slate-700 text-2xl font-bold">{idea.title}</h3>
    <div class="absolute right-0 top-0">
      <IdeaIcon idea={idea} small />
    </div>
  </div>
  <p class="line-clamp-2">
    {idea.content}
  </p>
</a>
