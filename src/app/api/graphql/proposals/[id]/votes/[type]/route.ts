export async function GET(
  request: Request,
  { params }: { params: { id: string; type: string } },
) {
  const id = params.id;
  const type = params.type;

  return new Response(`ID: ${id}, type: ${type}`, {
    status: 200,
  });
}
