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

<a href={`/ideas/${idea.id}`} class="flex flex-col items-center text-center p-2 hover:bg-lime-200 hover:bg-opacity-25 rounded-lg w-20">
  <IdeaIcon idea={idea} />
  <h3 class="text-sm">{idea.title}</h3>
</a>
