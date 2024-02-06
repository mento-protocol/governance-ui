import { useState } from "react";
import { SeeAll } from "..";
import styles from "./execution-code-view.module.scss";

interface ExecutionCodeViewProps {
  code: unknown;
}

export const ExecutionCodeView = ({ code }: ExecutionCodeViewProps) => {
  const [isExecutionViewOpen, setIsExecutionViewOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h3 className={styles.form_data_title}>Execution Code</h3>
      <div className={styles.execution}>
        <SeeAll
          height="210"
          isOpen={isExecutionViewOpen}
          setIsOpen={setIsExecutionViewOpen}
        >
          <div>
            <pre>{JSON.stringify(code, null, 2)}</pre>
          </div>
        </SeeAll>
      </div>
    </div>
  );
};
