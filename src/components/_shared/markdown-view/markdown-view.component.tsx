import { cn } from "@mento-protocol/ui-toolkit";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

type MarkdownViewProps = {
  markdown: string;
};

export const MarkdownView = ({ markdown }: MarkdownViewProps) => {
  return (
    <div
      className={cn(
        "prose text-black-off dark:prose-invert max-w-none dark:text-white",
        "text-[20px]/none",
        "[&_a:hover]:text-primary [&_li]:m-0",
      )}
    >
      {markdown && (
        <ReactMarkdown className={"leading-snug"} remarkPlugins={[gfm]}>
          {markdown}
        </ReactMarkdown>
      )}
    </div>
  );
};
