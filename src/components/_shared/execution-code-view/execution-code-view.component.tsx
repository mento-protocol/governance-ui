import { useState } from "react";
import { SeeAll } from "@/components/_shared";

interface ExecutionCodeViewProps {
  code: unknown;
}

export const ExecutionCodeView = ({ code }: ExecutionCodeViewProps) => {
  const [isExecutionViewOpen, setIsExecutionViewOpen] = useState(false);

  return (
    <div>
      <h3 className="my-x3 flex justify-center text-4xl">Execution Code</h3>
      <div className="rounded-lg border border-solid border-gray-light p-5">
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
