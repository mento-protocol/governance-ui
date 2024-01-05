import styles from '../create-proposal.module.scss'
import {Card, StepCounter} from "@components/_shared";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {CreateProposalFormStepEnum} from "@interfaces/create-proposal.interface";
import {useMemo} from "react";
import {useCreateProposalContext} from "@/app/providers/create-proposal.provider";

interface WrapperProps extends BaseComponentProps {
    step: CreateProposalFormStepEnum;
    title: string;
    isOpened: boolean;
}

const steps = [CreateProposalFormStepEnum.wallet, CreateProposalFormStepEnum.content, CreateProposalFormStepEnum.execution, CreateProposalFormStepEnum.preview];

const Wrapper = ({children, className, step, title, style, isOpened}: WrapperProps) => {

    const {toggleStepOpen} = useCreateProposalContext();

    const stepIndex = useMemo(() => {
        return steps.indexOf(step) + 1;
    }, [step]);

    return <Card block className={className} style={style}>
        <Card.Header>
            <div className="flex gap-x2 items-center bg-inherit cursor-pointer" onClick={e => toggleStepOpen(step)}>
                <StepCounter>{stepIndex}</StepCounter>
                {title}
            </div>
        </Card.Header>
        <div className={classNames(styles.form_element, isOpened && styles.opened, 'mt-5 flex flex-col place-items-center full-w')}>
            <div className={styles.inner}>
                {children}
            </div>
        </div>
    </Card>;
}

export default Wrapper;