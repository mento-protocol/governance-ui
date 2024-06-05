import { Alfajores, Celo } from "@/config/chains";
import { GovernorABI } from "@/lib/abi/Governor";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { createPublicClient, http } from "viem";
import { celo } from "viem/chains";

export const config = {
  matcher: ["/proposals/:id*"],
};

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/proposals")) {
    console.log("Middleware triggered", pathname.split("/"));
    const [, , id] = pathname.split("/");
    if (id) {
      // Query Celo
      const publicClient = createPublicClient({
        chain: Alfajores,
        transport: http(),
      });
      const fetch = async () => {
        const proposal = await publicClient.readContract({
          address: Alfajores.contracts.MentoGovernor.address,
          abi: GovernorABI,
          functionName: "proposals",
          args: [BigInt(id)],
        });

        if (proposal) {
          console.log("found");
          return true;
        } else {
          console.log("not found");
          return false;
        }
      };
      event.waitUntil(fetch());
    } else {
      // Direct home
    }
  }
  return NextResponse.next();
}
