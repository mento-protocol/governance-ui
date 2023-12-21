import '@mdxeditor/editor/style.css';
import styles from './markdown-editor.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import {TabList} from "@components/_shared";
import {MutableRefObject, Suspense, useEffect, useRef, useState} from "react";
import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles, codeBlockPlugin, codeMirrorPlugin,
    CodeToggle,
    CreateLink, diffSourcePlugin, headingsPlugin, imagePlugin,
    InsertCodeBlock,
    InsertImage,
    InsertThematicBreak, linkDialogPlugin, linkPlugin,
    listsPlugin,
    ListsToggle, markdownShortcutPlugin, MDXEditor,
    MDXEditorMethods, quotePlugin, thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo
} from "@mdxeditor/editor";
import { remark } from 'remark';
import html from 'remark-html';
interface MarkdownEditorProps extends BaseComponentProps {
    value: string;
    markdownChanged: (value: string) => void;
}
export const MarkdownEditor = ({className, style, value, markdownChanged }:MarkdownEditorProps) => {

    const [markdown, setMarkdown] = useState('');
    const [markdownParsed, setMarkdownParsed] = useState(null as string | null);

    const editorRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        remark().use(html).process(markdown).then((file) => {
            setMarkdownParsed(file.toString());
        });
    }, [markdown]);

    useEffect(() => {
        setMarkdown(value);
    }, [value]);

    const updateValue = (value: string) => {
        setMarkdown(value);
        markdownChanged(value);
    }

    return <div className={classNames(className)} style={style}>
        <TabList tabs={['Write', 'Preview']} headerPlacement="left">
            <div>
                <MDXEditor ref={editorRef}
                           className={styles.editor}
                           contentEditableClassName={classNames('prose', styles.editor__contentEditable)}
                           markdown={markdown}
                           onChange={updateValue}
                           plugins={[
                               toolbarPlugin({
                                   toolbarContents: () => <>
                                       <UndoRedo/>
                                       <BlockTypeSelect/>
                                       <BoldItalicUnderlineToggles/>
                                       <CodeToggle/>
                                       <CreateLink/>
                                       <InsertCodeBlock/>
                                       <InsertImage/>
                                       <ListsToggle/>
                                       <InsertThematicBreak/>
                                   </>
                               }),
                               listsPlugin(),
                               quotePlugin(),
                               headingsPlugin(),
                               linkPlugin(),
                               linkDialogPlugin(),
                               imagePlugin(),
                               thematicBreakPlugin(),
                               codeBlockPlugin({defaultCodeBlockLanguage: 'txt'}),
                               codeMirrorPlugin({codeBlockLanguages: {js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript'}}),
                               diffSourcePlugin({viewMode: 'rich-text', diffMarkdown: 'boo'}),
                               markdownShortcutPlugin()
                           ]}
                />
            </div>
            <div className="prose prose-neutral dark:prose-invert">
                {
                    markdownParsed && <div dangerouslySetInnerHTML={{ __html: markdownParsed }} />
                }
            </div>
        </TabList>
    </div>
}