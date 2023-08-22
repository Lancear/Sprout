<script>
  import { saveIdea } from '../../../database';
  import IdeaEditor from '../../../components/idea-editor.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  if (data.idea) {
    data.idea.viewedAt = new Date();
    saveIdea(data.idea);
  }

  if (!data.idea) {
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
  <IdeaEditor idea={data.idea} onSave={data.idea === undefined ? (id) => window.history.pushState(null, "", `/ideas/${id}`) : undefined} />
</div>
