"use client";
import { routingMap } from "@/lib/helpers/routing.map";
import WalletHelper from "@/lib/helpers/wallet.helper";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

type CrumbProps = {
  path: string;
  index: number;
  last: boolean;
};

const Crumb = ({ path, index, last }: CrumbProps) => {
  const crumbName = routingMap.get(path);
  const isProposalCrumb = crumbName === "Proposal";
  const proposalId = (useParams()?.id ?? "") as string;

  return (
    <li className="flex gap-2">
      {index > 0 && crumbName && <span>{">"}</span>}
      {last ? (
        <span>
          {crumbName}
          {isProposalCrumb && ` ${WalletHelper.getShortAddress(proposalId)}`}
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
  const path = usePathname() ?? "";
  const homePage = path === "/";
  const paths = path.split("/");
  const crumbsPath = useMemo(
    () => paths.filter((path) => routingMap.has(path)),
    [paths],
  );

  return !homePage ? (
    <nav
      className="mt-10 w-full font-inter text-[18px]/[20px] font-medium"
      aria-label="Breadcrumb"
    >
      <ol className="flex gap-2">
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
  ) : (
    <></>
  );
};
