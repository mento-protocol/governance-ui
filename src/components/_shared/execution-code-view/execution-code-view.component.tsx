import { useCallback, useMemo, useState } from "react";
import { SeeAll } from "@/components/_shared";

interface ExecutionCodeViewProps {
  title?: string;
  code: string;
}

export const ExecutionCodeView = ({ code, title }: ExecutionCodeViewProps) => {
  const [isExecutionViewOpen, setIsExecutionViewOpen] = useState(false);

  const isJSON = useCallback((input: string) => {
    try {
      JSON.parse(input);
    } catch (e) {
      return false;
    }
    return true;
  }, []);

  const parsedCode = useMemo(() => {
    try {
      if (isJSON(code)) return JSON.stringify(code, null, 2);
    } catch {
      console.error("Parse error", code);
    }
  }, [code, isJSON]);

  return (
    <div>
      {title && <h3 className="my-x3 flex justify-center text-4xl">{title}</h3>}

      <div className="rounded-lg border border-solid border-gray-light p-5">
        <SeeAll
          height="210"
          isOpen={isExecutionViewOpen}
          setIsOpen={setIsExecutionViewOpen}
        >
          <div>
            {/* <pre>{JSON.stringify(code, null, 2)}</pre> */}
            {!!parsedCode && <div>{parsedCode}</div>}
          </div>
        </SeeAll>
      </div>
    </div>
  );
};
