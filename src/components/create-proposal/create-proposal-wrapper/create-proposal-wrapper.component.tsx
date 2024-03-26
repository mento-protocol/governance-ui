import { ReactNode, useMemo } from "react";
import classNames from "classnames";
import { Button, Card, StepCounter } from "@/components/_shared";
import styles from "../create-proposal.module.scss";
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
      className={classNames(
        "pb-0",
        styles.wrapper,
        className,
        !isOpen && "opacity-50",
      )}
    >
      <Card.Header>
        <div className={styles.title}>
          <StepCounter>{componentStep}</StepCounter>
          {title}
        </div>
      </Card.Header>
      <div className={classNames(styles.form_element, isOpen && styles.opened)}>
        <div className={styles.inner}>{children}</div>
        <Card.Footer>
          <div className="flex full-w justify-start items-center gap-x3">
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
