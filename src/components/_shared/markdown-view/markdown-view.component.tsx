import styles from "./markdown-view.module.scss";
import { cn } from "@/styles/helpers";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

type MarkdownViewProps = {
  markdown: string;
};

export const MarkdownView = ({ markdown }: MarkdownViewProps) => {
  return (
    <div
      className={cn("prose", styles.container, "max-w-none dark:prose-invert")}
    >
      {markdown && (
        <ReactMarkdown className={"leading-snug"} remarkPlugins={[gfm]}>
          {markdown}
        </ReactMarkdown>
      )}
    </div>
  );
};
