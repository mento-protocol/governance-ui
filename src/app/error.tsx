"use client";

import * as Sentry from "@sentry/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button, links } from "@mento-protocol/ui-toolkit";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error, reset]);

  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html>
      <body className="flex h-screen flex-col items-center justify-center gap-12 dark:bg-black">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-fg text-7xl font-bold">Error</h1>
          <p className="font-fg text-3xl">Oops, something went wrong!</p>
        </div>
        <Button
          onClick={() => {
            if (isHome) {
              window.location.reload();
            }
            window.location.replace("/");
          }}
        >
          {isHome ? "Refresh" : "Return to Home"}
        </Button>
        <div className="flex flex-col items-center justify-center">
          <span className="block text-lg">
            If this problem persists please contact the Mento Labs support
          </span>
          <a href={links.discord} className="text-mento-blue underline">
            Contact Support
          </a>
        </div>
      </body>
    </html>
  );
}
