import { NextRequest } from "next/server";
import { IVoteType } from "@interfaces/vote.interface";

interface PutMethodContext {
  params: {
    id: string;
    type: IVoteType;
  };
}

export async function PUT(
  req: NextRequest,
  { params: { type, id } }: PutMethodContext,
) {
  const body = await req.json();

  const data = {
    id,
    type,
    ...body,
  };

  return Response.json(data);
}
