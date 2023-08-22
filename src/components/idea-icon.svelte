<script>
  import { colors } from "../domain";
  
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

  export let small = false;
</script>

<span class="flex items-center justify-center {small ? 'text-lg' : 'text-2xl'} p-1 {small ? 'h-9 w-9' : 'h-11 w-11'} rounded-lg bg-{colors[idea.label]}-200">
  {idea.growth === 0 ? '🌱' : idea.growth === 1 ? '🌷' : '💐'}
</span>
