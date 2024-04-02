import { ReactNode, useMemo } from "react";
import classNames from "classnames";
import { Button, Card, StepCounter } from "@/components/_shared";
import {
  CreateProposalStep,
  useCreateProposal,
} from "@/components/create-proposal/create-proposal-provider";

interface ICreateProposalWrapper {
  className?: string;
  componentStep: CreateProposalStep;
  title: string;
  children: ReactNode | ReactNode[];
  onPrev?: () => void;
  onNext?: () => void;
  onSave?: () => void;
}

const CreateProposalWrapper = ({
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
      className={classNames("p-x4 pb-0", className, !isOpen && "opacity-50")}
    >
      <Card.Header>
        <div
          className={
            "flex items-center gap-x2 bg-inherit pb-x2 text-xl font-medium"
          }
        >
          <StepCounter>{componentStep}</StepCounter>
          {title}
        </div>
      </Card.Header>
      <div
        className={classNames(
          "max-h-0 overflow-hidden !pb-0",
          isOpen &&
            "group/wrapper-open transition-max-h ease-in-cubic max-h-full p-initial duration-300",
        )}
      >
        <div className="group/wrapper-open:opacity-100 group/wrapper-open:translate-y-0 group/wrapper-open:transition-all group/wrapper-open:duration-300 group/wrapper-open:ease-out-back group/wrapper-open:break-all ease-in-cubic -translate-y-x5 overflow-hidden px-x2 pb-x3 pt-0 opacity-0 transition-all duration-0 md:px-x4 md:pb-x5">
          {children}
        </div>
        <Card.Footer>
          <div className="full-w flex items-center justify-start gap-x3">
            <Button
              className="min-w-x20"
              onClick={onPrev}
              disabled={!onPrev}
              theme="tertiary"
            >
              Back
            </Button>
            {onNext !== undefined && (
              <Button className="min-w-x20" onClick={onNext} theme="primary">
                Next
              </Button>
            )}
            {onSave !== undefined && (
              <Button className="min-w-x20" onClick={onSave} theme="primary">
                Save
              </Button>
            )}
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};

export default CreateProposalWrapper;
