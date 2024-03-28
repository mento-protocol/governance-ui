/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment ProposalFields on Proposal {\n  proposalId\n  description\n  proposer {\n    id\n  }\n  proposalCreated {\n    timestamp\n  }\n  votecast {\n    timestamp\n    voter {\n      id\n    }\n    support {\n      support\n      weight\n    }\n  }\n  startBlock\n  endBlock\n  queued\n  canceled\n  executed\n  state @client\n  metadata @client {\n    title\n    description\n  }\n  votes @client {\n    for {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    against {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    abstain {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    total\n  }\n}": types.ProposalFieldsFragmentDoc,
    "query getAllLocks {\n  locks(where: {relocked: false}) {\n    lockId\n    owner {\n      id\n    }\n    amount\n    time\n    slope\n    cliff\n    lockCreate {\n      id\n      timestamp\n    }\n    delegate {\n      id\n    }\n  }\n}": types.GetAllLocksDocument,
    "query getLocks($address: String) {\n  locks(where: {owner: $address}) {\n    lockId\n    owner {\n      id\n    }\n    amount\n    time\n    slope\n    cliff\n    lockCreate {\n      id\n      timestamp\n    }\n  }\n}": types.GetLocksDocument,
    "query getProposal($id: BigInt) {\n  proposals(where: {proposalId: $id}) {\n    ...ProposalFields\n    calls(orderBy: index, orderDirection: asc) {\n      index\n      target {\n        id\n      }\n      value\n      signature\n      calldata\n    }\n  }\n}": types.GetProposalDocument,
    "query getProposals {\n  proposals(orderBy: startBlock, orderDirection: desc) {\n    ...ProposalFields\n  }\n}": types.GetProposalsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProposalFields on Proposal {\n  proposalId\n  description\n  proposer {\n    id\n  }\n  proposalCreated {\n    timestamp\n  }\n  votecast {\n    timestamp\n    voter {\n      id\n    }\n    support {\n      support\n      weight\n    }\n  }\n  startBlock\n  endBlock\n  queued\n  canceled\n  executed\n  state @client\n  metadata @client {\n    title\n    description\n  }\n  votes @client {\n    for {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    against {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    abstain {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    total\n  }\n}"): (typeof documents)["fragment ProposalFields on Proposal {\n  proposalId\n  description\n  proposer {\n    id\n  }\n  proposalCreated {\n    timestamp\n  }\n  votecast {\n    timestamp\n    voter {\n      id\n    }\n    support {\n      support\n      weight\n    }\n  }\n  startBlock\n  endBlock\n  queued\n  canceled\n  executed\n  state @client\n  metadata @client {\n    title\n    description\n  }\n  votes @client {\n    for {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    against {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    abstain {\n      participants {\n        address\n        weight\n      }\n      total\n    }\n    total\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getAllLocks {\n  locks(where: {relocked: false}) {\n    lockId\n    owner {\n      id\n    }\n    amount\n    time\n    slope\n    cliff\n    lockCreate {\n      id\n      timestamp\n    }\n    delegate {\n      id\n    }\n  }\n}"): (typeof documents)["query getAllLocks {\n  locks(where: {relocked: false}) {\n    lockId\n    owner {\n      id\n    }\n    amount\n    time\n    slope\n    cliff\n    lockCreate {\n      id\n      timestamp\n    }\n    delegate {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getLocks($address: String) {\n  locks(where: {owner: $address}) {\n    lockId\n    owner {\n      id\n    }\n    amount\n    time\n    slope\n    cliff\n    lockCreate {\n      id\n      timestamp\n    }\n  }\n}"): (typeof documents)["query getLocks($address: String) {\n  locks(where: {owner: $address}) {\n    lockId\n    owner {\n      id\n    }\n    amount\n    time\n    slope\n    cliff\n    lockCreate {\n      id\n      timestamp\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getProposal($id: BigInt) {\n  proposals(where: {proposalId: $id}) {\n    ...ProposalFields\n    calls(orderBy: index, orderDirection: asc) {\n      index\n      target {\n        id\n      }\n      value\n      signature\n      calldata\n    }\n  }\n}"): (typeof documents)["query getProposal($id: BigInt) {\n  proposals(where: {proposalId: $id}) {\n    ...ProposalFields\n    calls(orderBy: index, orderDirection: asc) {\n      index\n      target {\n        id\n      }\n      value\n      signature\n      calldata\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getProposals {\n  proposals(orderBy: startBlock, orderDirection: desc) {\n    ...ProposalFields\n  }\n}"): (typeof documents)["query getProposals {\n  proposals(orderBy: startBlock, orderDirection: desc) {\n    ...ProposalFields\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;