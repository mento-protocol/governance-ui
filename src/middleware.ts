import { Celo } from "@/config/chains";
import { GovernorABI } from "@/lib/abi/Governor";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { createPublicClient, http } from "viem";

export const config = {
  matcher: ["/proposals/:id*"],
};

export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  if (!IS_PROD) return NextResponse.next();

  if (pathname.startsWith("/proposals")) {
    const [, , id] = pathname.split("/");
    if (id) {
      // Query Celo
      const publicClient = createPublicClient({
        chain: Celo,
        transport: http(),
      });

      let valid = false;
      const fetch = async () => {
        try {
          const proposal = await publicClient.readContract({
            address: Celo.contracts.MentoGovernor.address,
            abi: GovernorABI,
            functionName: "proposals",
            args: [BigInt(id)],
          });

          if (proposal) {
            console.log("found");
            valid = true;
          }
        } catch (error) {
          console.log("Proposal not found on Celo chain, redirecting");
        }
      };
      event.waitUntil(fetch());

      if (valid) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
