<script>
  import { getIdea, saveIdea } from '../../../database';
  import IdeaEditor from '../../../components/idea-editor.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  const idea = data.id !== 'new' 
    ? getIdea(parseInt(data.id)).then(idea => { if (idea === undefined) throw new Error("Idea not found!"); return idea; }) 
    : Promise.resolve(undefined);

  idea.then(idea => {
    if (idea) {
      idea.viewedAt = new Date();
      saveIdea(idea);
    }
  });

  if (data.id === "new") {
    const parsedUrl = new URL(window.location.toString());
    // searchParams.get() will properly handle decoding the values.
    console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
    console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
    console.log('URL shared: ' + parsedUrl.searchParams.get('url'));

    async function persist() {
      const isPersisted = await navigator.storage.persisted();
      if (!isPersisted) await navigator.storage.persist();
    }

    persist().catch(console.error);
  }
</script>

<div class="p-2 h-full flex flex-col gap-2">
  {#await idea}
    <IdeaEditor />
  {:then idea}
    <IdeaEditor idea={idea} onSave={data.id === 'new' ? (id) => window.history.pushState(null, "", `/ideas/${id}`) : undefined} />
  {:catch error}
    <p>🧇 Seems like something went wrong: {error?.message}</p>
    <IdeaEditor />
  {/await}
</div>
