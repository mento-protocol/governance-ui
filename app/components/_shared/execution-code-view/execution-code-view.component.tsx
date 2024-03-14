import { useState } from "react";
import { SeeAll } from "..";
import { JsonView, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
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

  const isDarkMode = document.body.classList.contains("dark");

  const codeObj = typeof code === "string" ? JSON.parse(code) : code;
  return (
    <div className={styles.container}>
      {!hideTitle && <h3 className={styles.form_data_title}>Execution Code</h3>}
      <div className={styles.execution}>
        <SeeAll
          height="210"
          isOpen={isExecutionViewOpen}
          setIsOpen={setIsExecutionViewOpen}
        >
          <div>
            {!!codeObj && (
              <JsonView
                data={codeObj}
                style={
                  isDarkMode
                    ? darkStyles
                    : {
                        ...defaultStyles,
                        container: `${defaultStyles.container} !bg-transparent`,
                      }
                }
              />
            )}
          </div>
        </SeeAll>
      </div>
    </div>
  );
};
