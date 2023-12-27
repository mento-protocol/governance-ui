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
    const pathName = routingMap[path];
    
    console.log('path', path)
    return (
        <li className={styles.crumb}>
            {index > 0 && pathName && <span className={styles.crumb__separator}>{">"}</span>}
            {last ? (
                <span className={styles.crumb__last}>{pathName}</span>
            ) : (
                <a href={path || "/"}>
                    {pathName}
                </a>
            )}
        </li>
    );
};

export const Breadcrumbs = () => {
    const paths = usePathname().split("/");
    const crumbPaths = useMemo(() => paths.filter(path => routingMap[path]), [paths]);

    return (
        <nav className={styles.container} aria-label="Breadcrumb">
            <ol>
                {crumbPaths.map((path, index) => (
                    <Crumb path={path} key={index} index={index} last={index === crumbPaths.length - 1} />
                ))}
            </ol>
        </nav>
    );
};
