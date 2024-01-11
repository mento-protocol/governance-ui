import styles from '../create-proposal.module.scss'
import {Button, Card, StepCounter} from "@components/_shared";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {CreateProposalFormStepEnum, createProposalFormStepOrder} from "@interfaces/create-proposal.interface";
import {useMemo} from "react";
import {useCreateProposalStore} from "@/app/store";

interface WrapperProps extends BaseComponentProps {
    step: CreateProposalFormStepEnum;
    title: string;
}

const Wrapper = ({children, className, step, title, style}: WrapperProps) => {

    const {form} = useCreateProposalStore();

    const stepIndex = useMemo(() => {
        return createProposalFormStepOrder.indexOf(step) + 1;
    }, [step]);

    const isOpened = useMemo(() => {
        return form[step].isOpened;
    }, [form, step]);

    const {next, prev, save, openedForm, canGoNext, canGoPrev} = useCreateProposalStore();

    return <Card block className={classNames(className, 'pb-0')} style={style}>
        <Card.Header>
            <div className="flex gap-x2 items-center bg-inherit">
                <StepCounter>{stepIndex}</StepCounter>
                {title}
            </div>
        </Card.Header>
        <div className={classNames(styles.form_element, isOpened && styles.opened)}>
            <div className={classNames('m-x4 flex flex-col place-items-center')}>
                <div className={styles.inner}>
                    {children}
                </div>
            </div>
            <Card.Footer>
                <div className="flex full-w justify-start items-center gap-x3">
                    <Button className="min-w-x20" onClick={prev} disabled={!canGoPrev} theme="tertiary">Back</Button>
                    {canGoNext && <Button className="min-w-x20" onClick={next} theme="primary">Next</Button>}
                    {!canGoNext && openedForm === CreateProposalFormStepEnum.preview && <Button className="min-w-x20" onClick={save} theme="primary">Save</Button>}
                </div>
            </Card.Footer>
        </div>
    </Card>;
}

export default Wrapper;