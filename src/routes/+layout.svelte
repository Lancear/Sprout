<script>
  import "../app.css";

  const navItems = [
    // {
    //   href: "/settings",
    //   title: "🎨 Settings",
    // },
    {
      href: "/",
      title: "🏡 Home",
    },
    {
      href: "/ideas",
      title: "👩‍🌾 All Ideas",
    },
  ];
</script>

<div class="flex flex-col w-screen h-screen bg-slate-500">
  <main class="w-screen text-slate-200 caret-sprout5" style="height: calc(100vh - 52px);">
    <slot></slot>
  </main>
  <nav class="justify-self-end flex justify-around py-2 bg-slate-600">
    {#each navItems as navItem}
      <a href={navItem.href} class="py-1 px-4 text-lg text-sprout2 hover:bg-lime-200 hover:bg-opacity-25 rounded-lg">{navItem.title}</a>
    {/each}
  </nav>
</div>


