"use client";
import { useMemo } from "react";
import Link from "next/link";
import { routingMap } from "@/lib/helpers/routing.map";
import { useParams, usePathname } from "next/navigation";

type CrumbProps = {
  path: string;
  index: number;
  last: boolean;
};

const Crumb = ({ path, index, last }: CrumbProps) => {
  const crumbName = routingMap.get(path);
  const isProposalCrumb = crumbName === "Proposal";
  const proposalId = (useParams().id || "") as string;

  return (
    // TODO: Line height used here for 20px, adjust using padding
    // TODO: color: foreground color
    <li className="text-xl">
      {index > 0 && crumbName && <span className="my-2.5">{">"}</span>}
      {last ? (
        <span>
          {crumbName}
          {isProposalCrumb && ` ${shortenProposalId(proposalId)}`}
        </span>
      ) : (
        // TODO: text color $c-primary
        <Link href={path || "/"} className="">
          {crumbName}
        </Link>
      )}
    </li>
  );
};

export const Breadcrumbs = () => {
  const paths = usePathname().split("/");
  const crumbsPath = useMemo(
    () => paths.filter((path) => routingMap.has(path)),
    [paths],
  );

  return (
    <nav className="w-full" aria-label="Breadcrumb">
      <ol>
        {crumbsPath.map((path, index) => (
          <Crumb
            key={index}
            path={path}
            index={index}
            last={index === crumbsPath.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
};

function shortenProposalId(proposalId: string): string {
  return `${proposalId.slice(0, 8)}...${proposalId.slice(-4)}`;
}
