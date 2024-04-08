import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import styles from "./markdown-view.module.scss";
import { cn } from "@/styles/helpers";

type MarkdownViewProps = {
  markdown: string;
};

export const MarkdownView = ({ markdown }: MarkdownViewProps) => {
  const [markdownParsed, setMarkdownParsed] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const file = await remark().use(html).process(markdown);
        setMarkdownParsed(file.toString());
      } catch (err) {
        console.log("Error while parsing markdown", err);
      }
    })();
  }, [markdown]);

  return (
    <div
      className={cn("prose", styles.container, "max-w-none dark:prose-invert")}
    >
      {markdownParsed && (
        <div dangerouslySetInnerHTML={{ __html: markdownParsed }} />
      )}
    </div>
  );
};
