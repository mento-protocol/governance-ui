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

      return new Promise((resolve) => {
        publicClient
          .readContract({
            address: Celo.contracts.MentoGovernor.address,
            abi: GovernorABI,
            functionName: "proposals",
            args: [BigInt(id)],
          })
          .then((proposal) => {
            if (proposal) {
              resolve(NextResponse.next());
            } else {
              const url = new URL("/", request.url);
              console.log("Proposal not found, redirecting");
              resolve(NextResponse.redirect(url.origin));
            }
          })
          .catch((error) => {
            console.log("Proposal not found on Celo chain, redirecting");
            const url = new URL("/", request.url);
            resolve(NextResponse.redirect(url.origin));
          });
      });
    } else {
      console.log("Proposal ID not found, redirecting");
      const url = new URL("/", request.url);
      return NextResponse.redirect(url.origin);
    }
  }
}
