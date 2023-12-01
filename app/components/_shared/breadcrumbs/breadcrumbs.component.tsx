"use client";
import styles from './breadcrumbs.module.scss';
import {usePathname} from "next/navigation";
import {routingMap} from "@/app/helpers/routing.map";

export const Breadcrumbs = () => {

    const paths = usePathname().split('/');
    console.log(paths);

    const Crumb = ({path, key} : {path: string, key: string | number}) => {
        return <li className="inline-flex items-center">
            <a href={path || '/'} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                {routingMap[path]}
            </a>
        </li>;
    }

    return <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {paths.map((path, index) => <Crumb path={path} key={index}/>)}
        </ol>
    </nav>
}