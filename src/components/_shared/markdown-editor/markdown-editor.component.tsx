import { useEffect, useRef, useState } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { MarkdownView } from "@/components/_shared";
import { cn } from "@mento-protocol/ui-toolkit";
import { cva } from "class-variance-authority";

interface MarkdownEditorProps extends BaseComponentProps {
  value: string;
  error?: string;
  markdownChanged: (value: string) => void;
}

const buttonVariants = cva(
  cn(
    "m-0 mb-x2 mr-x2 cursor-pointer border-none bg-none p-0",
    "hover:text-primary",
  ),
  {
    variants: {
      active: {
        true: "text-primary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const MarkdownEditor = ({
  className,
  value,
  markdownChanged,
}: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(value);
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
    <div className={className}>
      <div>
        <button
          className={buttonVariants({
            active: selectedView === "editor",
          })}
          onClick={() => setSelectedView("editor")}
        >
          Editor
        </button>
        <button
          className={buttonVariants({
            active: selectedView === "preview",
          })}
          onClick={() => setSelectedView("preview")}
        >
          Preview
        </button>
        {selectedView === "editor" && (
          <div>
            <MDXEditor
              ref={editorRef}
              className={
                // TODO: Error border
                "h-full w-full rounded-lg border bg-white text-black"
              }
              contentEditableClassName={cn(
                "prose-editor prose max-h-[650px] min-h-[450px] overflow-y-auto",
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
          <div className="max-h-[650px] overflow-y-auto">
            <MarkdownView markdown={markdown} />
          </div>
        )}
      </div>
    </div>
  );
};
