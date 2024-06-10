import { ReactNode, useMemo } from "react";
import { Button, Card, StepCounter } from "@/components/_shared";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { cn } from "@/styles/helpers";
import { cva } from "class-variance-authority";

interface ICreateProposalWrapper {
  className?: string;
  componentStep: CreateProposalStep;
  title: string | ReactNode;
  children: ReactNode | ReactNode[];
  onPrev?: () => void;
  onNext?: () => void;
  onSave?: () => void;
}

const variants = cva("group max-h-0 overflow-hidden", {
  variants: {
    open: {
      true: "open transition-max-h max-h-full p-initial duration-300 ease-in-cubic",
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const CreateProposalWrapper = ({
  children,
  className,
  componentStep,
  title,
  onPrev,
  onNext,
  onSave,
}: ICreateProposalWrapper) => {
  const { step } = useCreateProposal();

  const isOpen = useMemo(() => {
    return step === componentStep;
  }, [componentStep, step]);

  return (
    <Card
      block
      className={cn("px-10 pb-4", !isOpen && "opacity-50", className)}
    >
      <Card.Header>
        <div
          className={
            "flex items-center gap-x2 bg-inherit pb-2 text-xl font-medium"
          }
        >
          <StepCounter>{componentStep}</StepCounter>
          {title}
        </div>
      </Card.Header>
      <div
        className={variants({
          open: isOpen,
        })}
      >
        <div
          className={cn(
            "group:break-all group-[.open]:translate-y-0 group-[.open]:opacity-100 group-[.open]:transition-all group-[.open]:duration-300",
            "overflow-hidden pt-0 opacity-0 transition-all duration-0 ease-in-cubic",
          )}
        >
          {children}
        </div>
        <Card.Footer>
          <div className="full-w flex items-center justify-start gap-x3 py-x4 empty:hidden">
            {onPrev && (
              <Button
                className="min-w-x20"
                onClick={onPrev}
                disabled={!onPrev}
                theme="clear"
              >
                Back
              </Button>
            )}

            {onNext !== undefined && (
              <Button className="min-w-x20" onClick={onNext} theme="primary">
                Continue
              </Button>
            )}
            {onSave !== undefined && (
              <Button className="min-w-x20" onClick={onSave} theme="primary">
                Create Proposal
              </Button>
            )}
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};
