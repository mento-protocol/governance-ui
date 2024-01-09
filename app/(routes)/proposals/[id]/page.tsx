"use client";

import { singleProposal } from "@/app/helpers/mocks";
import useModal from "@/app/providers/modal.provider";
import { Avatar, Badge, Button, Card, Input, MarkdownView, TabList, WalletAddressWithCopy } from "@components/_shared";
import { Countdown } from "@components/countdown/countdown.component";
import { VotesList } from "@components/votes-list/votes-list.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { statusToBadgeColorMap } from "@interfaces/proposal";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, number, object, setLocale } from "yup";
import styles from "./page.module.scss";

const validationSchema = object({
    votingPower: number().required().typeError('Invalid number').max(400)
});
type FormData = InferType<typeof validationSchema>


const Page = () => {

    const {showQuestion, showModal} = useModal();

    setLocale({
        mixed: {
            default: 'Invalid number',
        },
        number: {
            max: ({max}) => (`Must not exceed ${max}`),
        },
    });

    const [votingOpened, setVotingOpened] = useState(false);
    const [votesListOpened, setVotesListOpened] = useState(false);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'all'
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        showQuestion(<div>Confirm the action <Button onClick={showDummyModal}>ASD</Button></div>, {
            modalType: 'success'
        }).then((result) => {
            if (result) {
                console.log('resolved');
            } else {
                console.log('rejected');
            }
        });
    };

    const showDummyModal = () => {
        showModal('Some info').then((result) => {
            console.log(result, 'dummy');
        });
    }

    const proposal = singleProposal;

    return <main className="flex flex-col">
        <Badge className="uppercase mt-x6 mb-3 font-medium"
               type={statusToBadgeColorMap[proposal.status]}>{proposal.status.toString()}</Badge>
        <div className="flex flex-col md:grid md:grid-cols-7 gap-x1 ">
            <div className="md:col-start-1 md:col-span-4">
                <h1 className="text-xl md:text-5xl font-semibold">{proposal.title}</h1>
            </div>
            <div className="md:col-start-5 md:col-span-3">
                <Countdown end={proposal.deadlineAt} countDownMilliseconds={1000}/>
            </div>
        </div>
        <div className="flex flex-wrap place-items-center justify-start md:justify-between mt-8 gap-x1 ">
            <div className="flex place-items-center gap-1">
                <Avatar address={proposal.creator || ''}/>
                <div>by {proposal.creator}</div>
            </div>
            <div className="flex place-items-center gap-x2">
                <code>ID</code>
                <WalletAddressWithCopy address={proposal.id}/>
            </div>
            <div className="flex place-items-center gap-1">
                <span>Proposed on:</span>
                <strong>{format(proposal.createdAt, 'MMMM do, yyyy')}</strong>
            </div>
            <div className="flex place-items-center gap-1">
                <span>Voting deadline:</span>
                <strong>{format(proposal.deadlineAt, 'MMMM do, yyyy')}</strong>
            </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between place-items-start gap-x1 ">
            <div className={classNames(styles.details, "flex-1")}>
                <h3>Details</h3>
                <MarkdownView markdown={proposal.description} />
            </div>
            <div className={styles.proposal_addons}>
                <div className={classNames(styles.mobile_controls)}>
                    <Button wrapperClassName={styles.mobile_button_wrapper} className={styles.mobile_button} theme="primary" onClick={() => setVotingOpened(true)}>
                        Vote
                    </Button>
                    <Button wrapperClassName={styles.mobile_button_wrapper} className={styles.mobile_button} theme="secondary" onClick={() => setVotesListOpened(true)}>
                        Votes
                    </Button>
                </div>
                <div className={classNames(styles.backdrop, votingOpened && styles.opened)}>
                    <Card className={classNames(styles.proposal_addon, votingOpened && styles.opened)}>
                        <Card.Header className="text-center text-2xl">
                            <strong>Voting</strong>
                            <button className={styles.proposal_addon__close} onClick={() => setVotingOpened(false)}>
                                X
                            </button>
                        </Card.Header>
                        <div className="flex flex-col gap-1 ">
                            <Input label="Voting power"
                                   id="voting-power"
                                   type="number"
                                   className={styles.input}
                                   placeholder="Voting power"
                                   form={{...register('votingPower')}}
                                   error={errors.votingPower?.message}
                                   addon={<div className={styles.addon}>
                                       <div className="flex justify-between">
                                           <div className="underline">Max available</div>
                                           <div>400 MENT</div>
                                       </div>
                                   </div>}/>
                            <p className={styles.vote_label}>Vote</p>
                            <Button className={styles.button_wrapper} disabled={!isValid} theme="success" block onClick={handleSubmit(onSubmit)}>
                                For
                            </Button>
                            <Button className={styles.button_wrapper} disabled={!isValid} type="submit" theme="danger" block
                                    onClick={handleSubmit(onSubmit)}>
                                Against
                            </Button>
                            <Button className={styles.button_wrapper} disabled={!isValid} type="submit" theme="tertiary" block
                                    onClick={handleSubmit(onSubmit)}>
                                Abstain
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className={classNames(styles.backdrop, votesListOpened && styles.opened)}>
                    <Card
                        className={classNames(styles.proposal_addon, votesListOpened && styles.opened, styles.votesList, 'mt-5')}>
                        <Card.Header className="text-center text-2xl">
                            <strong>Votes</strong>
                            <button className={styles.proposal_addon__close} onClick={() => setVotesListOpened(false)}>
                                X
                            </button>
                        </Card.Header>
                        <TabList tabs={['For', 'Against', 'Abstain']}>
                            <VotesList voteType="for"/>
                            <VotesList voteType="abstain"/>
                            <VotesList voteType="abstain"/>
                        </TabList>
                    </Card>
                </div>
            </div>
        </div>
    </main>
}

export default Page;