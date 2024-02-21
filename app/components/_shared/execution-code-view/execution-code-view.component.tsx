import { useState } from "react";
import { SeeAll } from "..";
import styles from "./execution-code-view.module.scss";

interface ExecutionCodeViewProps {
  code: unknown;
  hideTitle?: boolean;
}

export const ExecutionCodeView = ({
  code,
  hideTitle,
}: ExecutionCodeViewProps) => {
  const [isExecutionViewOpen, setIsExecutionViewOpen] = useState(false);

  const codeString = JSON.stringify(code, null, 2);
  return (
    <div className={styles.container}>
      {!hideTitle && <h3 className={styles.form_data_title}>Execution Code</h3>}
      <div className={styles.execution}>
        <SeeAll
          height="210"
          isOpen={isExecutionViewOpen}
          setIsOpen={setIsExecutionViewOpen}
        >
          <div>{!!codeString.length && <pre>{codeString}</pre>}</div>
        </SeeAll>
      </div>
    </div>
  );
};
