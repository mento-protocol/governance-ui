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
    "query getProposals {\n  proposals {\n    id\n    proposalId\n    description\n    proposer {\n      id\n    }\n    supports {\n      id\n      weight\n      support\n    }\n    queued\n    canceled\n    executed\n    proposalCreated {\n      timestamp\n    }\n    metadata @client {\n      title\n      description\n    }\n    state @client\n    votes @client {\n      votesFor\n      votesAgainst\n      votesAbstain\n      votesTotal\n    }\n  }\n}": types.GetProposalsDocument,
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
export function gql(source: "query getProposals {\n  proposals {\n    id\n    proposalId\n    description\n    proposer {\n      id\n    }\n    supports {\n      id\n      weight\n      support\n    }\n    queued\n    canceled\n    executed\n    proposalCreated {\n      timestamp\n    }\n    metadata @client {\n      title\n      description\n    }\n    state @client\n    votes @client {\n      votesFor\n      votesAgainst\n      votesAbstain\n      votesTotal\n    }\n  }\n}"): (typeof documents)["query getProposals {\n  proposals {\n    id\n    proposalId\n    description\n    proposer {\n      id\n    }\n    supports {\n      id\n      weight\n      support\n    }\n    queued\n    canceled\n    executed\n    proposalCreated {\n      timestamp\n    }\n    metadata @client {\n      title\n      description\n    }\n    state @client\n    votes @client {\n      votesFor\n      votesAgainst\n      votesAbstain\n      votesTotal\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;