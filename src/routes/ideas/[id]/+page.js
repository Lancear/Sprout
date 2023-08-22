export async function load({ params }) {
  const { getIdea } = await import('../../../database.js');
  return { idea: params.id !== "new" ? await getIdea(parseInt(params.id)) : undefined };
}
