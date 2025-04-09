import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="mx-auto max-w-[1120px] px-4 pb-10 pt-16 lg:px-10 xl:px-0">
      <div className="space-y-4">
        <h1 className="font font-fg text-5xl font-bold uppercase sm:text-6xl md:text-7xl">
          <span className="stroked-text">Voting Policy</span>
        </h1>

        <h2 className="pt-4 font-fg text-3xl font-[600]">1. Preamble</h2>
        <p className="tracking-loose text-lg md:text-xl">
          This Mento Governance Voting Policy (the &quot;Voting Policy&quot;)
          sets out all the rules for governance voting for changes to be made to
          the Mento Protocol. This Voting Policy applies to everybody who is a
          holder of MENTO governance token (the &quot;MENTO Token&quot;) and
          therefore eligible to participate in governance voting.
        </p>

        <h4 className="font-fg text-2xl font-[500]">What is Governance</h4>
        <p className="tracking-loose text-lg md:text-xl">
          Governance is the mechanism in place to decide on changes to be made
          to the Mento Protocol. The governance to the Mento Protocol is
          decentralized. This means not one person or entity controls the
          decision making of the Mento Protocol, but rather a community of
          different stakeholders who vote on-chain. On-chain governance only
          allows changes to the Mento Protocol based on a proposal and must
          follow certain rules outlined in this Voting Policy. The proposed
          Mento Protocol changes are already written in the code and executed
          automatically via smart contracts, if the community votes positively.
        </p>

        <h2 className="pt-4 font-fg text-3xl font-[600]">
          2. Distribution of Votes
        </h2>
        <p className="tracking-loose text-lg md:text-xl">
          Mento governance components are explained{" "}
          <a
            href="https://docs.mento.org/mento/governance-and-token/governance-components"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="tracking-loose text-lg md:text-xl">
          Governance scope (&quot;what is being governed&quot;) is explained{" "}
          <a
            href="https://docs.mento.org/mento/governance-and-token/governance-scope"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="tracking-loose text-lg md:text-xl">
          The MENTO Token and its distribution are explained{" "}
          <a
            href="https://docs.mento.org/mento/governance-and-token/mento-token"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>

        <h4 className="font-fg text-2xl font-[500]">
          Initial MENTO Token Distribution
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-2 text-left font-fg text-lg">Entity</th>
                <th className="px-4 py-2 text-left font-fg text-lg">Share</th>
                <th className="px-4 py-2 text-left font-fg text-lg">Voting?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="tracking-loose px-4 py-2 text-lg">
                  Mento Community Treasury
                </td>
                <td className="tracking-loose px-4 py-2 text-lg">45%</td>
                <td className="tracking-loose px-4 py-2 text-lg">No</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="tracking-loose px-4 py-2 text-lg">
                  Mento Labs Team, Investors, Future Hires, Advisors
                </td>
                <td className="tracking-loose px-4 py-2 text-lg">30%</td>
                <td className="tracking-loose px-4 py-2 text-lg">
                  Yes, with 25% of their respective MENTO Token allocation
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="tracking-loose px-4 py-2 text-lg">
                  Mento Liquidity Support
                </td>
                <td className="tracking-loose px-4 py-2 text-lg">10%</td>
                <td className="tracking-loose px-4 py-2 text-lg">No</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="tracking-loose px-4 py-2 text-lg">
                  Airdrop Recipients
                </td>
                <td className="tracking-loose px-4 py-2 text-lg">5%</td>
                <td className="tracking-loose px-4 py-2 text-lg">Yes</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="tracking-loose px-4 py-2 text-lg">
                  Celo Community Treasury
                </td>
                <td className="tracking-loose px-4 py-2 text-lg">5%</td>
                <td className="tracking-loose px-4 py-2 text-lg">Yes</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="tracking-loose px-4 py-2 text-lg">
                  Mento Reserve Safety Fund
                </td>
                <td className="tracking-loose px-4 py-2 text-lg">5%</td>
                <td className="tracking-loose px-4 py-2 text-lg">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="tracking-loose text-lg md:text-xl">
          As soon as the MENTO Token from the Mento and Celo Community Treasury
          or Mento Liquidity Support is distributed to the community, they can
          become voting MENTO Tokens.
        </p>
        <p className="tracking-loose text-lg md:text-xl">
          All MENTO Token holders can vote with their veMENTO Tokens.
        </p>
        <p className="tracking-loose text-lg md:text-xl">
          The MENTO Token allocation of the Mento Labs team, its investors, and
          advisors is split into two parts:
        </p>
        <ul className="tracking-loose my-3.5 list-inside list-disc text-lg md:text-xl">
          <li>25% is locked veMENTO Token and can participate in voting;</li>
          <li>
            75% is locked and must be vested; voting is not possible until the
            vesting period has expired.
          </li>
        </ul>

        <h4 className="font-fg text-2xl font-[500]">Governance Watchdogs</h4>
        <p className="tracking-loose text-lg md:text-xl">
          Members of the Mento Governance Watchdog group oversee the Mento
          Protocol by scrutinizing governance proposals. These watchdogs have
          veto power in order to protect the Mento Protocol from malicious
          proposals. More information can be found{" "}
          <a
            href="https://mentolabs.notion.site/Mento-Governance-Watchdogs-1c523e14987740c99fa7dedd490c0aa9"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>

        <h2 className="pt-4 font-fg text-3xl font-[600]">
          3. General Voting Guidelines
        </h2>
        <h4 className="font-fg text-2xl font-[500]">Decentralization</h4>
        <p className="tracking-loose text-lg md:text-xl">
          Mento is a decentralized EVM stablecoin platform. There is no single
          entity that controls the Mento Platform. Stablecoins are voted into
          existence by on-chain governance. The Celo community has voted the
          MENTO Token into existence. Governance proposals and votes should
          support further decentralization so that the Mento Platform can
          provide transparent, decentralized, accessible, community-driven
          stablecoins for every country in the world.
        </p>

        <h4 className="font-fg text-2xl font-[500]">Stability</h4>
        <p className="tracking-loose text-lg md:text-xl">
          All the smart contracts and the reserve of the Mento Platform are
          open-source, on-chain, auditable, and transparent. The main goal of
          the stablecoin platform is to create stable value assets. Stablecoins
          are stable when they closely track the value of local fiat currencies.
          All governance proposals and voting should have the stability of the
          stablecoins as a north-star goal in mind.
        </p>

        <h4 className="font-fg text-2xl font-[500]">Inclusivity</h4>
        <p className="tracking-loose text-lg md:text-xl">
          Mento stands out as a community-run stablecoin platform. Governance
          proposals should be discussed within the community with mutual
          fairness, respect, openness, and transparency, preferential treatment
          of certain groups within the community is interdicted. The Mento forum
          can be accessed{" "}
          <a
            href="https://forum.mento.org/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>

        <h2 className="pt-4 font-fg text-3xl font-[600]">
          4. General Voting Process
        </h2>
        <ol className="tracking-loose my-3.5 list-inside list-decimal text-lg md:text-xl">
          <li>
            <strong className="font-[500]">Forum:</strong> A MGP (Mento
            Governance Proposal) draft should be posted, explained, and
            discussed in the forum. Users with a minimum of 10,000 veMENTO in
            voting power can create a new MGP.
          </li>
          <li>
            <strong className="font-[500]">Voting:</strong> veMENTO holders vote
            on each MGP.
          </li>
          <li>
            <strong className="font-[500]">Acceptance:</strong> When a vote
            passes with enough votes, the Mento governance executor executes the
            updates automatically.
          </li>
          <li>
            <strong className="font-[500]">Mento Governance Watchdogs:</strong>{" "}
            Nominated guardians from the community can veto any malicious MGPs.
            More information can be found{" "}
            <a
              href="https://mentolabs.notion.site/Mento-Governance-Watchdogs-1c523e14987740c99fa7dedd490c0aa9"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </li>
        </ol>

        <h2 className="pt-4 font-fg text-3xl font-[600]">
          5. Voting Policy for the Mento Labs Allocation
        </h2>
        <p className="tracking-loose text-lg md:text-xl">
          The Mento Labs&apos; team, its advisors, and investors are independent
          community participants and, therefore, vote according to their
          preferences and on their behalf. There is no binding voting agreement
          or obligation in place.
        </p>
        <p className="tracking-loose text-lg md:text-xl">
          In 2025, the Mento Labs core team will only engage in votes if their
          voting does not affect the outcome of the community decision.
        </p>
        <p className="tracking-loose text-lg md:text-xl">
          Mento Labs GmbH does not vote except when bound to instructions of the
          Mento Labs investors for the MENTO Token that is distributed to Mento
          Labs investors, but not transferable yet.
        </p>
      </div>
    </div>
  );
};

export default Page;
