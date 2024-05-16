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
    <li className="flex gap-2">
      {index > 0 && crumbName && <span>{">"}</span>}
      {last ? (
        <span>
          {crumbName}
          {isProposalCrumb && ` ${shortenProposalId(proposalId)}`}
        </span>
      ) : (
        <Link href={path || "/"} className="text-primary">
          {index === 0 ? "Home" : crumbName}
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
    <nav className="mt-10 w-full text-[20px]/none" aria-label="Breadcrumb">
      <ol className="flex gap-2 font-inter">
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
