import styles from './markdown-editor.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import BaseInputProps from "@interfaces/base-input-props.interface";
import classNames from "classnames";
import {TabList} from "@components/_shared";
import dynamic from "next/dynamic";
import {Suspense, useEffect, useRef, useState} from "react";
import {MDXEditorMethods} from "@mdxeditor/editor";
import { remark } from 'remark';
import html from 'remark-html';

const EditorComp = dynamic(() => import('./partials/editor.component'), { ssr: false })

interface MarkdownEditorProps extends BaseComponentProps, BaseInputProps {

}
export const MarkdownEditor = ({className, style}:MarkdownEditorProps) => {

    const [markdown, setMarkdown] = useState('');
    const [markdownParsed, setMarkdownParsed] = useState(null as string | null);

    useEffect(() => {
        remark().use(html).process(markdown).then((file) => {
            setMarkdownParsed(file.toString());
        });
    }, [markdown]);

    const ref = useRef<MDXEditorMethods>(null);

    return <div className={classNames(className)} style={style}>
        <TabList tabs={['Write', 'Preview']} headerPlacement="left">
            <div className={styles.editor}>
                <Suspense fallback={null}>
                    <EditorComp markdown={markdown} setMarkdown={setMarkdown} editorRef={ref}/>
                </Suspense>
            </div>
            <div className="prose prose-neutral">
                {
                    markdownParsed && <div dangerouslySetInnerHTML={{ __html: markdownParsed }} />
                }
            </div>
        </TabList>
    </div>
}