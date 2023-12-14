'use client'
import '@mdxeditor/editor/style.css';
import styles from './editor.module.scss';
import {
    MDXEditor,
    MDXEditorMethods,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    markdownShortcutPlugin,
    BlockTypeSelect,
    CodeToggle, CreateLink, InsertCodeBlock, InsertImage, ListsToggle, InsertThematicBreak
} from "@mdxeditor/editor"
import {FC, MutableRefObject} from 'react'
import classNames from "classnames";

interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    editorRef?: MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({markdown,setMarkdown, editorRef}) => {

    return <MDXEditor ref={editorRef}
                      className={styles.editor}
                      contentEditableClassName={classNames('prose', styles.editor__contentEditable)}
                      markdown={markdown}
                      onChange={setMarkdown}
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
}

export default Editor;