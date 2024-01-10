import IProposal, { ProposalStatus } from "@interfaces/proposal";
import { MentoIcon } from "@components/_icons";
import addDays from "date-fns/addDays";
import { IVote } from "@interfaces/vote.interface";
import { ILock } from "@interfaces/lock.interface";
import { addYears } from "date-fns";

const proposalDescription = `This is an amended draft proposal by the RARI Foundation, addressing community feedback.
    
### Abstract

The Rari Foundation is submitting a proposal to jumpstart the growth in the Arbitrum NFT ecosystem. The proposal involves integrating Arbitrum One with the open-source Rarible protocol, which is an indexer, orderbook and SDK powering NFT-based applications, which, once integrated, can be freely and easily used by the Artbitrum builders.

### Motivation

The Arbitrum ecosystem is hard for independent developers to build NFT-based applications due to a lack of easy-to-use tooling and infrastructure. Without this support, the developer community will be opting for other chains with more robust support for building.
Optimism vs Arbitrum NFT stats as of July 27, 2023 indicate Arbitrum is not the first choice for the creation of NFT assets or contracts. Source NFT Scan.
The open-source Rarible Protocol is specifically focused on the NFT use case and will enable builders to develop their next dapps choosing Arbitrum, resulting in bringing in new Arbitrum users and sequencer revenue.
The Rarible Protocol is a trusted choice as it’s community governed, has an easy-to-use API, a comprehensive SDK, and is committed to expanding its capabilities to power innovative NFT use cases. Furthermore, the Protocol is used by Rarible.com NFT marketplace, whose brand and community can be leveraged in raising awareness about Arbitrum venturing deeper into NFT tooling. Such signaling to the market will show that the Arbitrum community is serious about growing its ecosystem and flourishing NFTs. Rarible and the Rari Foundation will promote the integration in a cross-marketing push to ensure the NFT and crypto community knows that Arbitrum is serious about NFT growth. This support will consist of (and shall not be limited to):

* Regular features on Rarible.com top spotlight section (1 million MAU)
* Dedicated social support for the launch on Rarible’s and Rari Foundation's owned channels (Twitter, Instagram, Discord, 800k+ followers combined)
* Email blasts for the integration (500k+ subscribers)
* Leveraging Rarible's and Rari Foundation's press relations
* Potentially a hackathon

This proposal is being submitted outside of the pending grants framework, in order to implement the integration asap, as waiting for the grants framework would result in significant implementation delays. As such, the Arbitrum DAO has an opportunity to express its willingness to incentivize ecosystem growth via strategic partnerships.

### Rationale

The proposed AIP aligns with the Arbitrum community's mission and guiding values by enhancing the utility, scalability, and inclusivity of the Arbitrum network. The Rarible Protocol, a decentralized toolset for NFT applications, is open-source and free, mirroring Arbitrum's commitment to technical inclusivity and neutrality. By integrating Arbitrum One into the Rarible Protocol, we empower developers to create more complex and innovative applications on Arbitrum. This integration increases accessibility to real-time and historical Arbitrum blockchain data, aligning closely with Arbitrum's commitment to user-centricity and technical inclusivity.

### Key Terms

**The Rari Foundation**: The legal entity for the Rari DAO community that is in possession of $RARI Treasury and on the path of possession of the Rarible protocol

**Rarible Inc**: A leading NFT marketplace that allows users to mint, buy, and sell NFTs. One of the applications using the Rarible protocol.

**Rarible Protocol**: Open-source, free-to-use, community-governed Protocol (which includes an SDK, indexer and orderbook) for the creation, transaction, and distribution of NFTs.

**Rarible SDK**: A part of the Rarible protocol that provides a set of tools for developers to interact with multiple blockchains

A few notes on the Rarible Protocol:

* It is an open-source, EVM-based SDK and multichain indexer that currently powers 4,000+ NFT marketplaces (including Rarible.com), and a series of non-marketplace-based applications (like wallets and NFT analytics services - see more use cases here).
* Designed as a set of building blocks, the Rarible protocol empowers the creation of fully customized NFT experiences of any level and complexity. ️
* API access is lightning-fast, unified, and comprehensive. You gain seamless access to NFT Items, Collections, -Activities, and NFT Metadata across multiple blockchains, including ETH, POL, IMX, FLOW, TEZ, to name a few —all consolidated within a single endpoint.
* The protocol’s indexer is the fastest on the market. It retrieves blockchain data through fast APIs, eliminating the need for your own indexer and reducing costs associated with maintaining Blockchain Nodes.
* User-friendly SDK allows you to seamlessly connect wallets, mint NFTs, put them up for sale, purchase NFTs, showcase collections, and so much more. The Protocol is the feature-rich product on the market (you can do anything NFT related on our Protocol).
* Comprehensive Marketplace Support: Our platform offers unrivaled support for various marketplaces, providing access to aggregated orderbooks from major platforms like OS, LR, X2Y2, Sudoswap, and Tezos, so you can ensure your users have access to the most competitive listings in the market.
* Cutting-Edge NFT API Integration: We pride ourselves on providing the best NFT API support, seamlessly integrating with popular communication tools such as Discord, Zendesk, VIP support, Slack, and TG.
* Powerful Analytics Capabilities: Our platform boasts best-in-class analytics tools, including OLAP statistics and floor price analysis, empowering users with valuable insights into market trends and performance.
* Unmatched Reliability: We maintain the highest level of reliability, ensuring a remarkable 99.99% uptime for our protocol, making us the most dependable choice in the market.

### Specifications

Below is a detailed breakdown of how the integration will take place and the platforms and technologies that will be used. &nbsp; Rarible Protocol: Integrating Arbitrum One &nbsp;
 The Rarible Protocol is a decentralized toolset that allows developers to build NFT applications. It includes smart contracts, an indexer, an SDK, and APIs. The integration of Arbitrum One into the Rarible Protocol will extend these capabilities to the Arbitrum ecosystem, enhancing its utility and inclusivity.

* Rarible Arbitrum SDK
  * The Rarible SDK will expedite Arbitrum application development. By extending the SDK to support Arbitrum One, we will provide developers with tools for interacting with smart contracts, supporting NFT operations like minting, transferring, and burning, and integrating with multiple wallets.
* Rarible Orderbook & Smart Contracts
  * Our contracts, specifically the Rarible Exchange V2, will be deployed to the Arbitrum chain, granting access to our off-chain order book. Certain actions such as canceling, confirming, updating, or when price changes occur, are on-chain but the creation of orders is off-chain.
* Rarible Public API
  * With the integration of Arbitrum One, the API will offer extended support for these chains, allowing developers to easily access and interact with NFT data on Arbitrum.
* Rarible Arbitrum Indexer
  * Rarible’s multichain Indexer will be able to track and record NFT events on Arbitrum, providing developers with a comprehensive view of NFT activities on Arbitrum.

### Steps to Implement

**Arbitrum One integration into Rarible Protocol**

The first key milestone will be integrating Arbitrum into the Rarible Protocol, which will set the foundation for future milestones involving building NFT applications on Arbitrum.

Tasks: Integration of Arbitrum One chain into Rarible Protocol

* Arbitrum API Integration: This task involves integrating the Arbitrum API into the Rarible Protocol API to support Arbitrum One.
* Node Preparation: A separate node for Arbitrum will be set up for rapid indexing upon approval
* Contract Deployment: The Rarible Shared NFT, Rarible Factory (for creating collections), and Rarible ExchangeV2 contracts will be deployed to Arbitrum for users to interact with.
* Orderbook: Rarible’s orderbook will be able to store listings, orders, and bids made with the protocol Arbitrum Indexer: Index NFT contracts, ERC-721/1155, ERC-20 tokens, Exchange orders & bids (from Seaport & Rarible).
* Arbitrum support on Rarible Multichain SDK: This involves adding a new blockchain, connectors to wallets, and ensuring functionality similar to ETH/Polygon.
* Debugging and Testing: General debugging of all components will be conducted, along with testing on production with OpenSea orders.
* Build Testnet for Arbitrum: An additional environment for the testnet will be set up, including indexing, reindexing, etc.

### Timeline

The tentative timeline consists of 7 weeks in total, 5 of which are the integration phase. If the proposal is approved by early September 2023, the project implementation can be executed in early Q4 2023.

### Overall Cost

As the integration of the Rarible Protocol and Arbitrum will benefit both ecosystems, we are offering to split the Rarible Protocol integration costs between our two parties with an equal share.

**Integration of Arbitrum One into the Rarible Protocol**

Duration: 5 WeeksCosts: 200,000 $ (Artibtrum portion = 100,000 $)

Payment terms:

50% payable upon proposal approval

50% payable upon completion (identified as the release of Rarible's protocol integration to Arbitrum, with the API up and running, contracts deployed, NFTs are queryable)

The 100,000 USD amount is payable in ARB under the exchange rate on the day of the proposal submission. As of Sept 13, the rate is 1 ARB = $0.785339, which translates to 127,351 ARB.

Note that the Rari Foundation will absorb costs related to the service and maintainance of the Protocol upkeep after the integration implementation.`

export const singleProposal: IProposal = {
    id: '599ca521-df39-442f-937c-03b20bcafc2d',
    icon: <MentoIcon width={40} height={40} />,
    title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
    description: proposalDescription,
    status: ProposalStatus.active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: addDays(new Date(), Math.round(Math.random() * 10) * -1),
    deadlineAt: addDays(new Date(), Math.round(Math.random() * 10)),
    creator: 'Andrzej'
}

export const proposalsMock: IProposal[] = [
    {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    }, {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon width={40} height={40} />,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: new Date(),
        deadlineAt: new Date(),
        creator: 'Andrzej'
    },
];

export const votesMock: IVote[] = [
    {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 250,
        type: 'for',
    }, {
        address: '0xBFA98CF93CDDEE1FCA31F2C6D42DB66A9AB8A80D',
        votes: 456,
        type: 'against'
    }, {
        address: '0xBFA98CF93CDC5E1FBA31F2C6D42DB66A9AB8A80D',
        votes: 1000,
        type: 'against'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB64A9AB8A80D',
        votes: 234,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F3C6D42DB66A9AB8A80D',
        votes: 123,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 250,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB64A9AB8A80D',
        votes: 234,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F3C6D42DB66A9AB8A80D',
        votes: 123,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 250,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB64A9AB8A80D',
        votes: 234,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F3C6D42DB66A9AB8A80D',
        votes: 123,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 250,
        type: 'for'
    }, {
        address: '0xBFA91CF93CDC5E1FCA31F2C6D42DB66A9AB8A10D',
        votes: 567,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 45,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC8E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A82D',
        votes: 345,
        type: 'for'
    }, {
        address: '0xBFA78CF93CDC5E1FCA31F2C6D42DB66A9AB8A80C',
        votes: 4856,
        type: 'for'
    }, {
        address: '0xBFA16CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'for'
    }, {
        address: '0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 819,
        type: 'for'
    }, {
        address: '0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 981,
        type: 'for'
    }, {
        address: '0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'for'
    }, {
        address: '0xBFA98CF93ADC5E1CCA31F126D42DB66A9AB8A80D',
        votes: 456,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 1091,
        type: 'abstain'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'for'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'abstain'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 45,
        type: 'abstain'
    }, {
        address: '0xBFA98CF93CDC8E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A82D',
        votes: 345,
        type: 'for'
    }, {
        address: '0xBFA78CF93CDC5E1FCA31F2C6D42DB66A9AB8A80C',
        votes: 4856,
        type: 'abstain'
    }, {
        address: '0xBFA16CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'for'
    }, {
        address: '0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 819,
        type: 'abstain'
    }, {
        address: '0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 981,
        type: 'abstain'
    }, {
        address: '0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'abstain'
    }, {
        address: '0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 819,
        type: 'abstain'
    }, {
        address: '0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 981,
        type: 'abstain'
    }, {
        address: '0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'abstain'
    }, {
        address: '0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 819,
        type: 'abstain'
    }, {
        address: '0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 981,
        type: 'abstain'
    }, {
        address: '0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'abstain'
    }, {
        address: '0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 819,
        type: 'abstain'
    }, {
        address: '0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 981,
        type: 'abstain'
    }, {
        address: '0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 234,
        type: 'abstain'
    }, {
        address: '0xBFA98CF93ADC5E1CCA31F126D42DB66A9AB8A80D',
        votes: 456,
        type: 'for'
    }, {
        address: '0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 1091,
        type: 'for'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'abstain'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'against'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'against'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'abstain'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'against'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'against'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'abstain'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'against'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'against'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'abstain'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'against'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'against'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'abstain'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'against'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'against'
    }, {
        address: '0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 987,
        type: 'abstain'
    }, {
        address: '0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 716,
        type: 'against'
    }, {
        address: '0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D',
        votes: 189,
        type: 'against'
    },
]

export const locksMock: ILock[] = [
    {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        amountMNTO: 1500,
        amountsVeMNTO: 100000,
        expireDate: addYears(new Date(), 2),
    },
    {
        id: '599ca521-df39-442f-937c-03b20bcafc2a',
        amountMNTO: 500,
        amountsVeMNTO: 6700,
        expireDate: addYears(new Date(), 1),
    },
    {
        id: '599ca521-df39-442f-937c-03b20bcafc3d',
        amountMNTO: 200,
        amountsVeMNTO: 1500,
        expireDate: addYears(new Date(), 2),
    },
    {
        id: '599ca521-df39-442f-937c-03b20bcafcfd',
        amountMNTO: 1000,
        amountsVeMNTO: 80000,
        expireDate: addYears(new Date(), 3),
    },
]