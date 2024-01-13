import BaseComponentProps from "@interfaces/base-component-props.interface";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./markdown-editor.module.scss";
import { MarkdownView } from "..";
interface MarkdownEditorProps extends BaseComponentProps {
  value: string;
  markdownChanged: (value: string) => void;
}
export const MarkdownEditor = ({
  className,
  style,
  value,
  markdownChanged,
}: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState("");
  const editorRef = useRef<MDXEditorMethods>(null);

  const [selectedView, setSelectedView] = useState(
    "editor" as "editor" | "preview",
  );

  useEffect(() => {
    setMarkdown(value);
  }, [value]);

  const updateValue = (value: string) => {
    setMarkdown(value);
    markdownChanged(value);
  };

  return (
    <div className={classNames(className)} style={style}>
      <div>
        <button
          className={classNames(
            styles.editor_button,
            selectedView === "editor" && styles.active,
          )}
          onClick={() => setSelectedView("editor")}
        >
          Editor
        </button>
        <button
          className={classNames(
            styles.editor_button,
            selectedView === "preview" && styles.active,
          )}
          onClick={() => setSelectedView("preview")}
        >
          Preview
        </button>
        {selectedView === "editor" && (
          <div>
            <MDXEditor
              ref={editorRef}
              className={styles.editor}
              contentEditableClassName={classNames(
                "prose prose-editor",
                styles.editor__contentEditable,
              )}
              markdown={markdown}
              onChange={updateValue}
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BlockTypeSelect />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <CreateLink />
                      <InsertCodeBlock />
                      <InsertImage />
                      <ListsToggle />
                      <InsertThematicBreak />
                    </>
                  ),
                }),
                listsPlugin(),
                quotePlugin(),
                headingsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                imagePlugin(),
                thematicBreakPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    js: "JavaScript",
                    css: "CSS",
                    txt: "text",
                    tsx: "TypeScript",
                  },
                }),
                diffSourcePlugin({
                  viewMode: "rich-text",
                  diffMarkdown: "boo",
                }),
                markdownShortcutPlugin(),
              ]}
            />
          </div>
        )}
        {selectedView === "preview" && (
          <div className={styles.preview}>
            <MarkdownView markdown={markdown} />
          </div>
        )}
      </div>
    </div>
  );
};
