'use client'
import { MarkdownView } from '@/app/components/_shared/markdown-view/markdown-view.component'
import { GetProposal, ProposalState } from '@/app/graphql'
import { useProposalStates } from '@/app/hooks/useProposalStates'
import useModal from '@/app/providers/modal.provider'
import { useUserStore } from '@/app/store'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Loader,
  TabList,
  WalletAddressWithCopy,
} from '@components/_shared'
import { Countdown } from '@components/countdown/countdown.component'
import { ProposalCurrentVotes } from '@components/proposal-current-votes/proposal-current-votes.component'
import { VotesList } from '@components/votes-list/votes-list.component'
import { stateToBadgeColorMap } from '@interfaces/proposal.interface'
import { IVoteType } from '@interfaces/vote.interface'
import classNames from 'classnames'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import styles from './page.module.scss'

const voteTypeToModalType = (voteType: IVoteType) => {
  switch (voteType) {
    case 'for':
      return 'success'
    case 'against':
      return 'error'
    case 'abstain':
    default:
      return 'info'
  }
}

const Page = ({ params }: { params: { id: string } }) => {
  const { showConfirm } = useModal()
  const { walletAddress, balanceVeMENTO } = useUserStore()

  const loading = false
  const { data } = useSuspenseQuery(GetProposal, {
    variables: { id: params.id },
  })
  useProposalStates(data?.proposals)
  const proposal = data?.proposals[0]
  console.log(proposal)

  const [votingOpened, setVotingOpened] = useState(false)
  const [votesListOpened, setVotesListOpened] = useState(false)

  const onSubmit = (voteType: IVoteType) => {
    showConfirm(`Are you sure you want to vote with ${balanceVeMENTO} power?`, {
      modalType: voteTypeToModalType(voteType),
    }).then((result) => {
      if (result) {
        // vote(voteType, balanceVeMENTO, walletAddress || "");
      }
    })
  }

  const estimatedBlockTimestamp = useMemo(() => {
    const CELO_BLOCK_TIME = 5 // seconds
    const targetBlock = proposal?.endBlock || 0
    const currentBlockTimestamp = block ? Number(block.timestamp) : 0
    const currentBlock = block ? Number(block.number) : 0
    return (
      currentBlockTimestamp + CELO_BLOCK_TIME * (targetBlock - currentBlock)
    )
  }, [block, proposal?.endBlock])

  return (
    <main className="flex flex-col">
      {loading && <Loader isCenter />}
      {!loading && !proposal && <div>Proposal not found</div>}
      {!loading && proposal && (
        <>
          <Badge
            className="uppercase mt-x6 mb-3 font-medium"
            type={stateToBadgeColorMap[proposal.state as ProposalState]}
          >
            {proposal.state.toString()}
          </Badge>
          <div className="flex flex-col md:grid md:grid-cols-7 gap-x1 ">
            <div className="md:col-start-1 md:col-span-4">
              <h1 className="text-xl md:font-size-x11 md:line-height-x11 font-medium">
                {proposal.metadata.title}
              </h1>
            </div>
            <div className="md:col-start-5 md:col-span-3"></div>
            <div className="md:col-start-5 md:col-span-3">
              {estimatedBlockTimestamp ? (
                <Countdown
                  end={estimatedBlockTimestamp}
                  countDownMilliseconds={1000}
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap place-items-center justify-start mt-8 gap-x6 ">
            <div className="flex place-items-center gap-x2">
              <Avatar address={proposal.proposer.id || ''} />
              by{' '}
              <span className="font-medium">
                <WalletAddressWithCopy address={proposal.proposer.id} />
              </span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Proposed on:</span>
              <span className="font-medium">
                {format(new Date(), 'MMMM do, yyyy')}
              </span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Voting deadline:</span>
              <span className="font-medium">
                {format(new Date(), 'MMMM do, yyyy')}
              </span>
            </div>
          </div>
          <div className="mt-x6 flex flex-col md:flex-row md:justify-between place-items-start gap-x1 ">
            <div className={classNames(styles.details, 'flex-1')}>
              <ProposalCurrentVotes className="mb-x6" />
              <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
                Proposal Description
              </h3>
              <MarkdownView markdown={proposal.metadata.description} />
            </div>
            <div className={styles.proposal_addons}>
              <div className={classNames(styles.mobile_controls)}>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  disabled={!walletAddress}
                  className={styles.mobile_button}
                  theme="primary"
                  onClick={() => setVotingOpened(true)}
                >
                  Vote
                </Button>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  className={styles.mobile_button}
                  theme="secondary"
                  onClick={() => setVotesListOpened(true)}
                >
                  Votes
                </Button>
              </div>
              <div
                className={classNames(
                  styles.backdrop,
                  votingOpened && styles.opened
                )}
              >
                <Card
                  className={classNames(
                    styles.proposal_addon,
                    votingOpened && styles.opened,
                    !walletAddress && '!opacity-60'
                  )}
                >
                  <Card.Header className="text-center">
                    <h2 className={styles.votes_title}>Cast votes</h2>
                    <button
                      className={styles.proposal_addon__close}
                      onClick={() => setVotingOpened(false)}
                    >
                      X
                    </button>
                  </Card.Header>
                  <div className="flex flex-col gap-1 ">
                    <div className={styles.addon}>
                      <div className="flex justify-center">
                        {!!walletAddress ? (
                          <div className={styles.power}>
                            <div className={styles.power__title}>
                              Your voting power
                            </div>
                            <div className={styles.power__value}>
                              {balanceVeMENTO} veMENTO
                            </div>
                          </div>
                        ) : (
                          <div className="underline">Please connect wallet</div>
                        )}
                      </div>
                    </div>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!walletAddress}
                      theme="success"
                      block
                      onClick={() => onSubmit('for')}
                    >
                      For
                    </Button>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!walletAddress}
                      type="submit"
                      theme="danger"
                      block
                      onClick={() => onSubmit('against')}
                    >
                      Against
                    </Button>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!walletAddress}
                      type="submit"
                      theme="tertiary"
                      block
                      onClick={() => onSubmit('abstain')}
                    >
                      Abstain
                    </Button>
                  </div>
                </Card>
              </div>
              <div
                className={classNames(
                  styles.backdrop,
                  votesListOpened && styles.opened
                )}
              >
                <Card
                  className={classNames(
                    styles.proposal_addon,
                    votesListOpened && styles.opened,
                    styles.votesList,
                    'mt-5'
                  )}
                >
                  <Card.Header className="text-center text-2xl">
                    <strong>Votes</strong>
                    <button
                      className={styles.proposal_addon__close}
                      onClick={() => setVotesListOpened(false)}
                    >
                      X
                    </button>
                  </Card.Header>
                  <TabList tabs={['For', 'Against', 'Abstain']}>
                    <VotesList voteType="for" />
                    <VotesList voteType="against" />
                    <VotesList voteType="abstain" />
                  </TabList>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Page
