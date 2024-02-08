"use client";
import styles from "../create-proposal.module.scss";
import { Button, Card, StepCounter } from "@components/_shared";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {
  CreateProposalFormStepEnum,
  createProposalFormStepOrder,
} from "@interfaces/create-proposal.interface";
import { ReactNode, useMemo } from "react";

interface WrapperProps extends BaseComponentProps {
  step: CreateProposalFormStepEnum;
  title: string | ReactNode;
  isOpened: boolean;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  next: () => void;
  prev: () => void;
}

const Wrapper = ({
  children,
  className,
  step,
  title,
  style,
  isOpened,
  canGoNext = true,
  canGoPrev = true,
  next,
  prev,
}: WrapperProps) => {
  const stepIndex = useMemo(() => {
    return createProposalFormStepOrder.indexOf(step) + 1;
  }, [step]);

  return (
    <Card
      block
      className={classNames(
        className,
        "pb-0",
        styles.wrapper,
        !isOpened && "opacity-50",
        !isOpened && "pointer-events-none",
      )}
      style={style}
    >
      <Card.Header>
        <div className={styles.title}>
          <StepCounter>{stepIndex}</StepCounter>
          {title}
        </div>
      </Card.Header>
      <div
        className={classNames(styles.form_element, isOpened && styles.opened)}
      >
        <div className={styles.inner}>{children}</div>
        <Card.Footer>
          <div className="flex full-w justify-start items-center gap-x3">
            <Button
              className="min-w-x20"
              onClick={prev}
              disabled={!canGoPrev}
              theme="tertiary"
            >
              Back
            </Button>
            {step !== CreateProposalFormStepEnum.preview && (
              <Button
                className="min-w-x20"
                onClick={next}
                theme="primary"
                disabled={!canGoNext}
              >
                Next
              </Button>
            )}
            {!canGoNext && step === CreateProposalFormStepEnum.preview && (
              <Button className="min-w-x20" onClick={next} theme="primary">
                Save
              </Button>
            )}
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};

export default Wrapper;
