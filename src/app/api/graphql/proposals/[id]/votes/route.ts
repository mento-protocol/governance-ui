export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  return new Response(`ID: ${id}`, {
    status: 200,
  });
}
