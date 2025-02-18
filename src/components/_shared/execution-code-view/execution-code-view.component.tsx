"use client";
import { useCallback, useMemo, useState } from "react";
import { SeeAll } from "@mento-protocol/ui-toolkit";
import { TransactionItem } from "@/lib/contracts/governor/useCreateProposalOnChain";

interface ExecutionCodeViewProps {
  title?: string;
  code: TransactionItem[] | string;
  overflowHeight?: number;
}

export const ExecutionCodeView = ({
  code,
  title,
  overflowHeight = 210,
}: ExecutionCodeViewProps) => {
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
      if (typeof code === "string") {
        if (isJSON(code)) return JSON.stringify(JSON.parse(code), null, 2);
      } else {
        return JSON.stringify(code, null, 2);
      }
    } catch {
      console.error("Parse error", code);
    }
  }, [code, isJSON]);

  return (
    <div>
      {title && <h3 className="my-x3 flex justify-center text-4xl">{title}</h3>}

      <div className="rounded-lg border border-solid border-gray-light p-5">
        <SeeAll
          height={overflowHeight}
          isOpen={isExecutionViewOpen}
          setIsOpen={setIsExecutionViewOpen}
        >
          {!!parsedCode && <pre>{parsedCode}</pre>}
        </SeeAll>
      </div>
    </div>
  );
};
