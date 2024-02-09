import { IVote } from "@interfaces/vote.interface";
import { NextRequest } from "next/server";

const votesMock: IVote[] = [
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 250,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDDEE1FCA31F2C6D42DB66A9AB8A80D",
    votes: 456,
    type: "against",
  },
  {
    address: "0xBFA98CF93CDC5E1FBA31F2C6D42DB66A9AB8A80D",
    votes: 1000,
    type: "against",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB64A9AB8A80D",
    votes: 234,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F3C6D42DB66A9AB8A80D",
    votes: 123,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 250,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB64A9AB8A80D",
    votes: 234,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F3C6D42DB66A9AB8A80D",
    votes: 123,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 250,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB64A9AB8A80D",
    votes: 234,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F3C6D42DB66A9AB8A80D",
    votes: 123,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 250,
    type: "for",
  },
  {
    address: "0xBFA91CF93CDC5E1FCA31F2C6D42DB66A9AB8A10D",
    votes: 567,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 45,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC8E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A82D",
    votes: 345,
    type: "for",
  },
  {
    address: "0xBFA78CF93CDC5E1FCA31F2C6D42DB66A9AB8A80C",
    votes: 4856,
    type: "for",
  },
  {
    address: "0xBFA16CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "for",
  },
  {
    address: "0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 819,
    type: "for",
  },
  {
    address: "0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 981,
    type: "for",
  },
  {
    address: "0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "for",
  },
  {
    address: "0xBFA98CF93ADC5E1CCA31F126D42DB66A9AB8A80D",
    votes: 456,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 1091,
    type: "abstain",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "for",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "abstain",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 45,
    type: "abstain",
  },
  {
    address: "0xBFA98CF93CDC8E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A82D",
    votes: 345,
    type: "for",
  },
  {
    address: "0xBFA78CF93CDC5E1FCA31F2C6D42DB66A9AB8A80C",
    votes: 4856,
    type: "abstain",
  },
  {
    address: "0xBFA16CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "for",
  },
  {
    address: "0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 819,
    type: "abstain",
  },
  {
    address: "0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 981,
    type: "abstain",
  },
  {
    address: "0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "abstain",
  },
  {
    address: "0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 819,
    type: "abstain",
  },
  {
    address: "0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 981,
    type: "abstain",
  },
  {
    address: "0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "abstain",
  },
  {
    address: "0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 819,
    type: "abstain",
  },
  {
    address: "0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 981,
    type: "abstain",
  },
  {
    address: "0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "abstain",
  },
  {
    address: "0xBFA10CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 819,
    type: "abstain",
  },
  {
    address: "0xBFA20CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 981,
    type: "abstain",
  },
  {
    address: "0xBFA98BB93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 234,
    type: "abstain",
  },
  {
    address: "0xBFA98CF93ADC5E1CCA31F126D42DB66A9AB8A80D",
    votes: 456,
    type: "for",
  },
  {
    address: "0xBFA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 1091,
    type: "for",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "abstain",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "against",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "against",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "abstain",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "against",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "against",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "abstain",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "against",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "against",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "abstain",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "against",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "against",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "abstain",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "against",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "against",
  },
  {
    address: "0xCDA98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 987,
    type: "abstain",
  },
  {
    address: "0x12398CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 716,
    type: "against",
  },
  {
    address: "0xABC98CF93CDC5E1FCA31F2C6D42DB66A9AB8A80D",
    votes: 189,
    type: "against",
  },
];

interface GetMethodContext {
  params: {
    id: String;
  };
}

export async function GET(
  req: NextRequest,
  { params: { id } }: GetMethodContext,
) {
  return Response.json(votesMock);
}
