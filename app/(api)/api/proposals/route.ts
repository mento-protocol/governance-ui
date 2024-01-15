import IProposal from "@interfaces/proposal.interface";
import { ProposalState } from "@/app/graphql/generated/graphql";
import { MentoIcon } from "@components/_icons";
import { NextRequest } from "next/server";

const proposalsMock: IProposal[] = [
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",

    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",

    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",

    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
  {
    id: "599ca521-df39-442f-937c-03b20bcafc2d",
    title: "Building  the Building the Future of NFTs: The Rarible Protocol",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: ProposalState.Active,
    votesYes: 2700,
    votesNo: 1400,
    votesTotal: 4100,
    createdAt: new Date(),
    deadlineAt: new Date(),
    creator: "Andrzej",
  },
];

export async function GET(req: NextRequest) {
  return Response.json(proposalsMock);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return Response.json(proposalsMock);
}
