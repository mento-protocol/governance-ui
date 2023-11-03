"use client";
import Proposal, {ProposalStatus, statusToBadgeColorMap} from "@interfaces/proposal";
import {Avatar, Badge, Button, Card, Input, Tab, TabList} from "@components/_shared";
import {Countdown} from "@components/countdown/countdown.component";
import {format} from "date-fns";
import {singleProposal} from "@/app/helpers/mocks";
import {useForm} from "react-hook-form";
import styles from "./page.module.scss";
import {InferType, number, object, setLocale} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {VotesList} from "@components/votes-list/votes-list.component";
import classNames from "classnames";

const validationSchema = object({
    votingPower: number().typeError('Invalid number').required().max(400).typeError('Must not exceed ${max}')
});
type FormData = InferType<typeof validationSchema>


const Page = () => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'all'
    });

    const onSubmit = (data: FormData) => {
        console.log(data)
    };
    const proposal = singleProposal;

    return <main>
        <Badge className="capitalize mb-3"
               type={statusToBadgeColorMap[proposal.status]}>{proposal.status.toString()}</Badge>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-default ">
            <div className="col-start-1 md:col-span-4">
                <h1 className="text-5xl font-semibold">{proposal.title}</h1>
            </div>
            <div className="col-start-5 md:col-span-3">
                <Countdown end={proposal.deadlineAt} countDownMilliseconds={1000}/>
            </div>
        </div>
        <div className="flex flex-wrap place-items-center justify-between mt-8 gap-default-x4">
            <div className="flex place-items-center gap-1">
                <Avatar address={proposal.creator || ''}/>
                <div>by {proposal.creator}</div>
            </div>
            <div className="flex place-items-center gap-1">
                <code>ID</code>
                <div>{`${proposal.id.substring(0, 6)}...${proposal.id.substring(proposal.id.length - 4)}`}</div>
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

        <div className="mt-8 flex md:flex-row place-items-start gap-default">
            <div className="flex-1">
                <h3>Details</h3>
                <div dangerouslySetInnerHTML={{__html: proposal.description}}/>
            </div>
            <div className={styles.proposal_addons}>
                <Card>
                    <Card.Header className="text-center text-2xl">
                        <strong>Voting</strong>
                    </Card.Header>
                    <div className="flex flex-col gap-1">
                        <Input label="Voting power"
                               id="voting-power"
                               type="number"
                               className={styles.input}
                               placeholder="Voting power"
                               form={{...register("votingPower")}}
                               error={errors.votingPower?.message}
                               addon={<div className={styles.addon}>
                                   <div className="flex justify-between">
                                       <div className="underline">Max available</div>
                                       <div>400 MENT</div>
                                   </div>
                               </div>}/>
                        <p className={styles.vote_label}>Vote</p>
                        <Button disabled={!isValid} theme="success" block onClick={handleSubmit(onSubmit)}>
                            For
                        </Button>
                        <Button disabled={!isValid} type="submit" theme="danger" block onClick={handleSubmit(onSubmit)}>
                            Against
                        </Button>
                        <Button disabled={!isValid} type="submit" theme="tertiary" block
                                onClick={handleSubmit(onSubmit)}>
                            Abstain
                        </Button>
                    </div>
                </Card>
                <Card className={classNames(styles.votesList, 'mt-5')}>
                    <Card.Header className="text-center text-2xl">
                        <strong>Votes</strong>
                    </Card.Header>
                    <TabList tabs={['For', 'Against', 'Abstain']}>
                        <VotesList voteType="for"/>
                        <VotesList voteType="abstain"/>
                        <VotesList voteType="abstain"/>
                    </TabList>
                    {/*<VotesList voteType="for"/>*/}

                </Card>
            </div>
        </div>
    </main>
}

export default Page;