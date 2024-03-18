"use client";
import { routingMap } from "@/app/helpers/routing.map";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import styles from "./breadcrumbs.module.scss";

type CrumbProps = {
  path: string;
  index: number;
  last: boolean;
};

const Crumb = ({ path, index, last }: CrumbProps) => {
  const crumbName = routingMap.get(path);
  const isProposalCrumb = crumbName === "Proposal";
  const proposalId = isProposalCrumb ? shortenProposalId(getProposalIdFromPath()) : "";

  return (
    <li className={styles.crumb}>
      {index > 0 && crumbName && (
        <span className={styles.crumb__separator}>{">"}</span>
      )}
      {last ? (
        <span>{crumbName}{isProposalCrumb && ` ${proposalId}`}</span>
      ) : (
        <a href={path || "/"} className={styles.crumb__clickable}>{crumbName}</a>
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
    <nav className={styles.container} aria-label="Breadcrumb">
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

function getProposalIdFromPath(): string {
  const proposalPagePattern = /\/proposals\/(\d+)/;
  if (!proposalPagePattern.test(usePathname())) {
    throw new Error("Not a proposal page");
  }
  const match = proposalPagePattern.exec(usePathname())!;
  return match[1]
}

function shortenProposalId(proposalId: string): string {
  return `${proposalId.slice(0,8)}...${proposalId.slice(-4)}`;
}