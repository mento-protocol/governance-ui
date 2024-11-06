/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export type AccessControl = {
  __typename?: 'AccessControl';
  asAccount: Account;
  id: Scalars['Bytes']['output'];
  roles: Array<AccessControlRole>;
};


export type AccessControlRolesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRole_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<AccessControlRole_Filter>;
};

export type AccessControlRole = {
  __typename?: 'AccessControlRole';
  admin: AccessControlRole;
  adminOf: Array<AccessControlRole>;
  contract: AccessControl;
  id: Scalars['ID']['output'];
  members: Array<AccessControlRoleMember>;
  role: Role;
  roleAdminChanged: Array<RoleAdminChanged>;
  roleGranted: Array<RoleGranted>;
  roleRevoked: Array<RoleRevoked>;
};


export type AccessControlRoleAdminOfArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRole_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<AccessControlRole_Filter>;
};


export type AccessControlRoleMembersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRoleMember_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<AccessControlRoleMember_Filter>;
};


export type AccessControlRoleRoleAdminChangedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleAdminChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleAdminChanged_Filter>;
};


export type AccessControlRoleRoleGrantedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleGranted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleGranted_Filter>;
};


export type AccessControlRoleRoleRevokedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleRevoked_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleRevoked_Filter>;
};

export type AccessControlRoleMember = {
  __typename?: 'AccessControlRoleMember';
  accesscontrolrole: AccessControlRole;
  account: Account;
  id: Scalars['ID']['output'];
};

export type AccessControlRoleMember_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  accesscontrolrole: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_: InputMaybe<AccessControlRole_Filter>;
  accesscontrolrole_contains: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_contains_nocase: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_ends_with: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_gt: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_gte: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_in: InputMaybe<Array<Scalars['String']['input']>>;
  accesscontrolrole_lt: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_lte: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not_contains: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not_ends_with: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  accesscontrolrole_not_starts_with: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_starts_with: InputMaybe<Scalars['String']['input']>;
  accesscontrolrole_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  account: InputMaybe<Scalars['String']['input']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_ends_with: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_gt: InputMaybe<Scalars['String']['input']>;
  account_gte: InputMaybe<Scalars['String']['input']>;
  account_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt: InputMaybe<Scalars['String']['input']>;
  account_lte: InputMaybe<Scalars['String']['input']>;
  account_not: InputMaybe<Scalars['String']['input']>;
  account_not_contains: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_starts_with: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  and: InputMaybe<Array<InputMaybe<AccessControlRoleMember_Filter>>>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<AccessControlRoleMember_Filter>>>;
};

export enum AccessControlRoleMember_OrderBy {
  Accesscontrolrole = 'accesscontrolrole',
  AccesscontrolroleId = 'accesscontrolrole__id',
  Account = 'account',
  AccountId = 'account__id',
  Id = 'id'
}

export type AccessControlRole_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  admin: InputMaybe<Scalars['String']['input']>;
  adminOf_: InputMaybe<AccessControlRole_Filter>;
  admin_: InputMaybe<AccessControlRole_Filter>;
  admin_contains: InputMaybe<Scalars['String']['input']>;
  admin_contains_nocase: InputMaybe<Scalars['String']['input']>;
  admin_ends_with: InputMaybe<Scalars['String']['input']>;
  admin_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  admin_gt: InputMaybe<Scalars['String']['input']>;
  admin_gte: InputMaybe<Scalars['String']['input']>;
  admin_in: InputMaybe<Array<Scalars['String']['input']>>;
  admin_lt: InputMaybe<Scalars['String']['input']>;
  admin_lte: InputMaybe<Scalars['String']['input']>;
  admin_not: InputMaybe<Scalars['String']['input']>;
  admin_not_contains: InputMaybe<Scalars['String']['input']>;
  admin_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  admin_not_ends_with: InputMaybe<Scalars['String']['input']>;
  admin_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  admin_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  admin_not_starts_with: InputMaybe<Scalars['String']['input']>;
  admin_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  admin_starts_with: InputMaybe<Scalars['String']['input']>;
  admin_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  and: InputMaybe<Array<InputMaybe<AccessControlRole_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<AccessControl_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  members_: InputMaybe<AccessControlRoleMember_Filter>;
  or: InputMaybe<Array<InputMaybe<AccessControlRole_Filter>>>;
  role: InputMaybe<Scalars['String']['input']>;
  roleAdminChanged_: InputMaybe<RoleAdminChanged_Filter>;
  roleGranted_: InputMaybe<RoleGranted_Filter>;
  roleRevoked_: InputMaybe<RoleRevoked_Filter>;
  role_: InputMaybe<Role_Filter>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_ends_with: InputMaybe<Scalars['String']['input']>;
  role_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_gt: InputMaybe<Scalars['String']['input']>;
  role_gte: InputMaybe<Scalars['String']['input']>;
  role_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_lt: InputMaybe<Scalars['String']['input']>;
  role_lte: InputMaybe<Scalars['String']['input']>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_starts_with: InputMaybe<Scalars['String']['input']>;
  role_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_starts_with: InputMaybe<Scalars['String']['input']>;
  role_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum AccessControlRole_OrderBy {
  Admin = 'admin',
  AdminOf = 'adminOf',
  AdminId = 'admin__id',
  Contract = 'contract',
  ContractId = 'contract__id',
  Id = 'id',
  Members = 'members',
  Role = 'role',
  RoleAdminChanged = 'roleAdminChanged',
  RoleGranted = 'roleGranted',
  RoleRevoked = 'roleRevoked',
  RoleId = 'role__id'
}

export type AccessControl_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<AccessControl_Filter>>>;
  asAccount: InputMaybe<Scalars['String']['input']>;
  asAccount_: InputMaybe<Account_Filter>;
  asAccount_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_gt: InputMaybe<Scalars['String']['input']>;
  asAccount_gte: InputMaybe<Scalars['String']['input']>;
  asAccount_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt: InputMaybe<Scalars['String']['input']>;
  asAccount_lte: InputMaybe<Scalars['String']['input']>;
  asAccount_not: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<AccessControl_Filter>>>;
  roles_: InputMaybe<AccessControlRole_Filter>;
};

export enum AccessControl_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  Id = 'id',
  Roles = 'roles'
}

export type Account = {
  __typename?: 'Account';
  asAccessControl: Maybe<AccessControl>;
  asGovernor: Maybe<Governor>;
  asLocking: Maybe<Locking>;
  asTimelock: Maybe<Timelock>;
  asVoting: Maybe<VotingContract>;
  delegateChangedEvent: Array<DelegateChanged>;
  delegateChangedFromEvent: Array<DelegateChanged>;
  delegateChangedToEvent: Array<DelegateChanged>;
  delegateVotesChangedEvent: Array<DelegateVotesChanged>;
  delegationFrom: Array<VoteDelegation>;
  delegationTo: Array<VoteDelegation>;
  events: Array<Event>;
  id: Scalars['Bytes']['output'];
  locks: Array<Lock>;
  membership: Array<AccessControlRoleMember>;
  proposed: Array<Proposal>;
  proposedCalls: Array<ProposalCall>;
  roleGranted: Array<RoleGranted>;
  roleGrantedSender: Array<RoleGranted>;
  roleRevoked: Array<RoleRevoked>;
  roleRevokedSender: Array<RoleRevoked>;
  timelockedCalls: Array<TimelockCall>;
  voteWeigth: Array<VoteWeight>;
  voted: Array<VoteReceipt>;
};


export type AccountDelegateChangedEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateChanged_Filter>;
};


export type AccountDelegateChangedFromEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateChanged_Filter>;
};


export type AccountDelegateChangedToEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateChanged_Filter>;
};


export type AccountDelegateVotesChangedEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateVotesChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateVotesChanged_Filter>;
};


export type AccountDelegationFromArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteDelegation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteDelegation_Filter>;
};


export type AccountDelegationToArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteDelegation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteDelegation_Filter>;
};


export type AccountEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Event_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Event_Filter>;
};


export type AccountLocksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Lock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Lock_Filter>;
};


export type AccountMembershipArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRoleMember_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<AccessControlRoleMember_Filter>;
};


export type AccountProposedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Proposal_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Proposal_Filter>;
};


export type AccountProposedCallsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalCall_Filter>;
};


export type AccountRoleGrantedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleGranted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleGranted_Filter>;
};


export type AccountRoleGrantedSenderArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleGranted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleGranted_Filter>;
};


export type AccountRoleRevokedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleRevoked_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleRevoked_Filter>;
};


export type AccountRoleRevokedSenderArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleRevoked_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<RoleRevoked_Filter>;
};


export type AccountTimelockedCallsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockCall_Filter>;
};


export type AccountVoteWeigthArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteWeight_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteWeight_Filter>;
};


export type AccountVotedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteReceipt_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteReceipt_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  asAccessControl: InputMaybe<Scalars['String']['input']>;
  asAccessControl_: InputMaybe<AccessControl_Filter>;
  asAccessControl_contains: InputMaybe<Scalars['String']['input']>;
  asAccessControl_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccessControl_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccessControl_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccessControl_gt: InputMaybe<Scalars['String']['input']>;
  asAccessControl_gte: InputMaybe<Scalars['String']['input']>;
  asAccessControl_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccessControl_lt: InputMaybe<Scalars['String']['input']>;
  asAccessControl_lte: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not_contains: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccessControl_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccessControl_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccessControl_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccessControl_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asGovernor: InputMaybe<Scalars['String']['input']>;
  asGovernor_: InputMaybe<Governor_Filter>;
  asGovernor_contains: InputMaybe<Scalars['String']['input']>;
  asGovernor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asGovernor_ends_with: InputMaybe<Scalars['String']['input']>;
  asGovernor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asGovernor_gt: InputMaybe<Scalars['String']['input']>;
  asGovernor_gte: InputMaybe<Scalars['String']['input']>;
  asGovernor_in: InputMaybe<Array<Scalars['String']['input']>>;
  asGovernor_lt: InputMaybe<Scalars['String']['input']>;
  asGovernor_lte: InputMaybe<Scalars['String']['input']>;
  asGovernor_not: InputMaybe<Scalars['String']['input']>;
  asGovernor_not_contains: InputMaybe<Scalars['String']['input']>;
  asGovernor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asGovernor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asGovernor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asGovernor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asGovernor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asGovernor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asGovernor_starts_with: InputMaybe<Scalars['String']['input']>;
  asGovernor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asLocking: InputMaybe<Scalars['String']['input']>;
  asLocking_: InputMaybe<Locking_Filter>;
  asLocking_contains: InputMaybe<Scalars['String']['input']>;
  asLocking_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asLocking_ends_with: InputMaybe<Scalars['String']['input']>;
  asLocking_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asLocking_gt: InputMaybe<Scalars['String']['input']>;
  asLocking_gte: InputMaybe<Scalars['String']['input']>;
  asLocking_in: InputMaybe<Array<Scalars['String']['input']>>;
  asLocking_lt: InputMaybe<Scalars['String']['input']>;
  asLocking_lte: InputMaybe<Scalars['String']['input']>;
  asLocking_not: InputMaybe<Scalars['String']['input']>;
  asLocking_not_contains: InputMaybe<Scalars['String']['input']>;
  asLocking_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asLocking_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asLocking_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asLocking_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asLocking_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asLocking_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asLocking_starts_with: InputMaybe<Scalars['String']['input']>;
  asLocking_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asTimelock: InputMaybe<Scalars['String']['input']>;
  asTimelock_: InputMaybe<Timelock_Filter>;
  asTimelock_contains: InputMaybe<Scalars['String']['input']>;
  asTimelock_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asTimelock_ends_with: InputMaybe<Scalars['String']['input']>;
  asTimelock_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asTimelock_gt: InputMaybe<Scalars['String']['input']>;
  asTimelock_gte: InputMaybe<Scalars['String']['input']>;
  asTimelock_in: InputMaybe<Array<Scalars['String']['input']>>;
  asTimelock_lt: InputMaybe<Scalars['String']['input']>;
  asTimelock_lte: InputMaybe<Scalars['String']['input']>;
  asTimelock_not: InputMaybe<Scalars['String']['input']>;
  asTimelock_not_contains: InputMaybe<Scalars['String']['input']>;
  asTimelock_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asTimelock_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asTimelock_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asTimelock_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asTimelock_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asTimelock_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asTimelock_starts_with: InputMaybe<Scalars['String']['input']>;
  asTimelock_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asVoting: InputMaybe<Scalars['String']['input']>;
  asVoting_: InputMaybe<VotingContract_Filter>;
  asVoting_contains: InputMaybe<Scalars['String']['input']>;
  asVoting_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asVoting_ends_with: InputMaybe<Scalars['String']['input']>;
  asVoting_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asVoting_gt: InputMaybe<Scalars['String']['input']>;
  asVoting_gte: InputMaybe<Scalars['String']['input']>;
  asVoting_in: InputMaybe<Array<Scalars['String']['input']>>;
  asVoting_lt: InputMaybe<Scalars['String']['input']>;
  asVoting_lte: InputMaybe<Scalars['String']['input']>;
  asVoting_not: InputMaybe<Scalars['String']['input']>;
  asVoting_not_contains: InputMaybe<Scalars['String']['input']>;
  asVoting_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asVoting_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asVoting_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asVoting_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asVoting_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asVoting_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asVoting_starts_with: InputMaybe<Scalars['String']['input']>;
  asVoting_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegateChangedEvent_: InputMaybe<DelegateChanged_Filter>;
  delegateChangedFromEvent_: InputMaybe<DelegateChanged_Filter>;
  delegateChangedToEvent_: InputMaybe<DelegateChanged_Filter>;
  delegateVotesChangedEvent_: InputMaybe<DelegateVotesChanged_Filter>;
  delegationFrom_: InputMaybe<VoteDelegation_Filter>;
  delegationTo_: InputMaybe<VoteDelegation_Filter>;
  events_: InputMaybe<Event_Filter>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  locks_: InputMaybe<Lock_Filter>;
  membership_: InputMaybe<AccessControlRoleMember_Filter>;
  or: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  proposedCalls_: InputMaybe<ProposalCall_Filter>;
  proposed_: InputMaybe<Proposal_Filter>;
  roleGrantedSender_: InputMaybe<RoleGranted_Filter>;
  roleGranted_: InputMaybe<RoleGranted_Filter>;
  roleRevokedSender_: InputMaybe<RoleRevoked_Filter>;
  roleRevoked_: InputMaybe<RoleRevoked_Filter>;
  timelockedCalls_: InputMaybe<TimelockCall_Filter>;
  voteWeigth_: InputMaybe<VoteWeight_Filter>;
  voted_: InputMaybe<VoteReceipt_Filter>;
};

export enum Account_OrderBy {
  AsAccessControl = 'asAccessControl',
  AsAccessControlId = 'asAccessControl__id',
  AsGovernor = 'asGovernor',
  AsGovernorId = 'asGovernor__id',
  AsGovernorMode = 'asGovernor__mode',
  AsLocking = 'asLocking',
  AsLockingId = 'asLocking__id',
  AsLockingMode = 'asLocking__mode',
  AsTimelock = 'asTimelock',
  AsTimelockId = 'asTimelock__id',
  AsVoting = 'asVoting',
  AsVotingId = 'asVoting__id',
  DelegateChangedEvent = 'delegateChangedEvent',
  DelegateChangedFromEvent = 'delegateChangedFromEvent',
  DelegateChangedToEvent = 'delegateChangedToEvent',
  DelegateVotesChangedEvent = 'delegateVotesChangedEvent',
  DelegationFrom = 'delegationFrom',
  DelegationTo = 'delegationTo',
  Events = 'events',
  Id = 'id',
  Locks = 'locks',
  Membership = 'membership',
  Proposed = 'proposed',
  ProposedCalls = 'proposedCalls',
  RoleGranted = 'roleGranted',
  RoleGrantedSender = 'roleGrantedSender',
  RoleRevoked = 'roleRevoked',
  RoleRevokedSender = 'roleRevokedSender',
  TimelockedCalls = 'timelockedCalls',
  VoteWeigth = 'voteWeigth',
  Voted = 'voted'
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']['input']>;
  number: InputMaybe<Scalars['Int']['input']>;
  number_gte: InputMaybe<Scalars['Int']['input']>;
};

export type Delegate = Event & {
  __typename?: 'Delegate';
  delegate: Account;
  emitter: Account;
  id: Scalars['ID']['output'];
  lock: Lock;
  locking: Locking;
  owner: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type DelegateChanged = Event & {
  __typename?: 'DelegateChanged';
  contract: VotingContract;
  delegation: Maybe<VoteDelegation>;
  delegator: Account;
  emitter: Account;
  fromDelegate: Account;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  toDelegate: Account;
  transaction: Transaction;
};

export type DelegateChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DelegateChanged_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<VotingContract_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegation: InputMaybe<Scalars['String']['input']>;
  delegation_: InputMaybe<VoteDelegation_Filter>;
  delegation_contains: InputMaybe<Scalars['String']['input']>;
  delegation_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegation_ends_with: InputMaybe<Scalars['String']['input']>;
  delegation_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegation_gt: InputMaybe<Scalars['String']['input']>;
  delegation_gte: InputMaybe<Scalars['String']['input']>;
  delegation_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegation_lt: InputMaybe<Scalars['String']['input']>;
  delegation_lte: InputMaybe<Scalars['String']['input']>;
  delegation_not: InputMaybe<Scalars['String']['input']>;
  delegation_not_contains: InputMaybe<Scalars['String']['input']>;
  delegation_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegation_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegation_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegation_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegation_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegation_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegation_starts_with: InputMaybe<Scalars['String']['input']>;
  delegation_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator: InputMaybe<Scalars['String']['input']>;
  delegator_: InputMaybe<Account_Filter>;
  delegator_contains: InputMaybe<Scalars['String']['input']>;
  delegator_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_gt: InputMaybe<Scalars['String']['input']>;
  delegator_gte: InputMaybe<Scalars['String']['input']>;
  delegator_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_lt: InputMaybe<Scalars['String']['input']>;
  delegator_lte: InputMaybe<Scalars['String']['input']>;
  delegator_not: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegator_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  fromDelegate: InputMaybe<Scalars['String']['input']>;
  fromDelegate_: InputMaybe<Account_Filter>;
  fromDelegate_contains: InputMaybe<Scalars['String']['input']>;
  fromDelegate_contains_nocase: InputMaybe<Scalars['String']['input']>;
  fromDelegate_ends_with: InputMaybe<Scalars['String']['input']>;
  fromDelegate_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  fromDelegate_gt: InputMaybe<Scalars['String']['input']>;
  fromDelegate_gte: InputMaybe<Scalars['String']['input']>;
  fromDelegate_in: InputMaybe<Array<Scalars['String']['input']>>;
  fromDelegate_lt: InputMaybe<Scalars['String']['input']>;
  fromDelegate_lte: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_contains: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_ends_with: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  fromDelegate_not_starts_with: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  fromDelegate_starts_with: InputMaybe<Scalars['String']['input']>;
  fromDelegate_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<DelegateChanged_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  toDelegate: InputMaybe<Scalars['String']['input']>;
  toDelegate_: InputMaybe<Account_Filter>;
  toDelegate_contains: InputMaybe<Scalars['String']['input']>;
  toDelegate_contains_nocase: InputMaybe<Scalars['String']['input']>;
  toDelegate_ends_with: InputMaybe<Scalars['String']['input']>;
  toDelegate_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  toDelegate_gt: InputMaybe<Scalars['String']['input']>;
  toDelegate_gte: InputMaybe<Scalars['String']['input']>;
  toDelegate_in: InputMaybe<Array<Scalars['String']['input']>>;
  toDelegate_lt: InputMaybe<Scalars['String']['input']>;
  toDelegate_lte: InputMaybe<Scalars['String']['input']>;
  toDelegate_not: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_contains: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_ends_with: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  toDelegate_not_starts_with: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  toDelegate_starts_with: InputMaybe<Scalars['String']['input']>;
  toDelegate_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum DelegateChanged_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  Delegation = 'delegation',
  DelegationId = 'delegation__id',
  Delegator = 'delegator',
  DelegatorId = 'delegator__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  FromDelegate = 'fromDelegate',
  FromDelegateId = 'fromDelegate__id',
  Id = 'id',
  Timestamp = 'timestamp',
  ToDelegate = 'toDelegate',
  ToDelegateId = 'toDelegate__id',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type DelegateVotesChanged = Event & {
  __typename?: 'DelegateVotesChanged';
  contract: VotingContract;
  delegate: Account;
  emitter: Account;
  id: Scalars['ID']['output'];
  newValue: Scalars['BigInt']['output'];
  oldValue: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
  voteWeight: Maybe<VoteWeight>;
};

export type DelegateVotesChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<DelegateVotesChanged_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<VotingContract_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate: InputMaybe<Scalars['String']['input']>;
  delegate_: InputMaybe<Account_Filter>;
  delegate_contains: InputMaybe<Scalars['String']['input']>;
  delegate_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_gt: InputMaybe<Scalars['String']['input']>;
  delegate_gte: InputMaybe<Scalars['String']['input']>;
  delegate_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_lt: InputMaybe<Scalars['String']['input']>;
  delegate_lte: InputMaybe<Scalars['String']['input']>;
  delegate_not: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegate_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  newValue: InputMaybe<Scalars['BigInt']['input']>;
  newValue_gt: InputMaybe<Scalars['BigInt']['input']>;
  newValue_gte: InputMaybe<Scalars['BigInt']['input']>;
  newValue_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newValue_lt: InputMaybe<Scalars['BigInt']['input']>;
  newValue_lte: InputMaybe<Scalars['BigInt']['input']>;
  newValue_not: InputMaybe<Scalars['BigInt']['input']>;
  newValue_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldValue: InputMaybe<Scalars['BigInt']['input']>;
  oldValue_gt: InputMaybe<Scalars['BigInt']['input']>;
  oldValue_gte: InputMaybe<Scalars['BigInt']['input']>;
  oldValue_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldValue_lt: InputMaybe<Scalars['BigInt']['input']>;
  oldValue_lte: InputMaybe<Scalars['BigInt']['input']>;
  oldValue_not: InputMaybe<Scalars['BigInt']['input']>;
  oldValue_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or: InputMaybe<Array<InputMaybe<DelegateVotesChanged_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  voteWeight: InputMaybe<Scalars['String']['input']>;
  voteWeight_: InputMaybe<VoteWeight_Filter>;
  voteWeight_contains: InputMaybe<Scalars['String']['input']>;
  voteWeight_contains_nocase: InputMaybe<Scalars['String']['input']>;
  voteWeight_ends_with: InputMaybe<Scalars['String']['input']>;
  voteWeight_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  voteWeight_gt: InputMaybe<Scalars['String']['input']>;
  voteWeight_gte: InputMaybe<Scalars['String']['input']>;
  voteWeight_in: InputMaybe<Array<Scalars['String']['input']>>;
  voteWeight_lt: InputMaybe<Scalars['String']['input']>;
  voteWeight_lte: InputMaybe<Scalars['String']['input']>;
  voteWeight_not: InputMaybe<Scalars['String']['input']>;
  voteWeight_not_contains: InputMaybe<Scalars['String']['input']>;
  voteWeight_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  voteWeight_not_ends_with: InputMaybe<Scalars['String']['input']>;
  voteWeight_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  voteWeight_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  voteWeight_not_starts_with: InputMaybe<Scalars['String']['input']>;
  voteWeight_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  voteWeight_starts_with: InputMaybe<Scalars['String']['input']>;
  voteWeight_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum DelegateVotesChanged_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  Delegate = 'delegate',
  DelegateId = 'delegate__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  NewValue = 'newValue',
  OldValue = 'oldValue',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  VoteWeight = 'voteWeight',
  VoteWeightId = 'voteWeight__id',
  VoteWeightValue = 'voteWeight__value'
}

export type Delegate_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Delegate_Filter>>>;
  delegate: InputMaybe<Scalars['String']['input']>;
  delegate_: InputMaybe<Account_Filter>;
  delegate_contains: InputMaybe<Scalars['String']['input']>;
  delegate_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_gt: InputMaybe<Scalars['String']['input']>;
  delegate_gte: InputMaybe<Scalars['String']['input']>;
  delegate_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_lt: InputMaybe<Scalars['String']['input']>;
  delegate_lte: InputMaybe<Scalars['String']['input']>;
  delegate_not: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegate_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  lock: InputMaybe<Scalars['String']['input']>;
  lock_: InputMaybe<Lock_Filter>;
  lock_contains: InputMaybe<Scalars['String']['input']>;
  lock_contains_nocase: InputMaybe<Scalars['String']['input']>;
  lock_ends_with: InputMaybe<Scalars['String']['input']>;
  lock_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  lock_gt: InputMaybe<Scalars['String']['input']>;
  lock_gte: InputMaybe<Scalars['String']['input']>;
  lock_in: InputMaybe<Array<Scalars['String']['input']>>;
  lock_lt: InputMaybe<Scalars['String']['input']>;
  lock_lte: InputMaybe<Scalars['String']['input']>;
  lock_not: InputMaybe<Scalars['String']['input']>;
  lock_not_contains: InputMaybe<Scalars['String']['input']>;
  lock_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  lock_not_ends_with: InputMaybe<Scalars['String']['input']>;
  lock_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  lock_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  lock_not_starts_with: InputMaybe<Scalars['String']['input']>;
  lock_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  lock_starts_with: InputMaybe<Scalars['String']['input']>;
  lock_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking: InputMaybe<Scalars['String']['input']>;
  locking_: InputMaybe<Locking_Filter>;
  locking_contains: InputMaybe<Scalars['String']['input']>;
  locking_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_gt: InputMaybe<Scalars['String']['input']>;
  locking_gte: InputMaybe<Scalars['String']['input']>;
  locking_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_lt: InputMaybe<Scalars['String']['input']>;
  locking_lte: InputMaybe<Scalars['String']['input']>;
  locking_not: InputMaybe<Scalars['String']['input']>;
  locking_not_contains: InputMaybe<Scalars['String']['input']>;
  locking_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_not_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<Delegate_Filter>>>;
  owner: InputMaybe<Scalars['String']['input']>;
  owner_: InputMaybe<Account_Filter>;
  owner_contains: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_gt: InputMaybe<Scalars['String']['input']>;
  owner_gte: InputMaybe<Scalars['String']['input']>;
  owner_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt: InputMaybe<Scalars['String']['input']>;
  owner_lte: InputMaybe<Scalars['String']['input']>;
  owner_not: InputMaybe<Scalars['String']['input']>;
  owner_not_contains: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum Delegate_OrderBy {
  Delegate = 'delegate',
  DelegateId = 'delegate__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Lock = 'lock',
  LockAmount = 'lock__amount',
  LockCliff = 'lock__cliff',
  LockId = 'lock__id',
  LockLockId = 'lock__lockId',
  LockRelocked = 'lock__relocked',
  LockSlope = 'lock__slope',
  LockTime = 'lock__time',
  Locking = 'locking',
  LockingId = 'locking__id',
  LockingMode = 'locking__mode',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type Event = {
  emitter: Account;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type Event_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<Event_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum Event_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type Governor = {
  __typename?: 'Governor';
  asAccount: Account;
  id: Scalars['Bytes']['output'];
  mode: Maybe<Scalars['String']['output']>;
  proposalCanceled: Array<ProposalCanceled>;
  proposalCreated: Array<ProposalCreated>;
  proposalExecuted: Array<ProposalExecuted>;
  proposalQueued: Array<ProposalQueued>;
  proposals: Array<Proposal>;
  votecast: Array<VoteCast>;
};


export type GovernorProposalCanceledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCanceled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalCanceled_Filter>;
};


export type GovernorProposalCreatedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCreated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalCreated_Filter>;
};


export type GovernorProposalExecutedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalExecuted_Filter>;
};


export type GovernorProposalQueuedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalQueued_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalQueued_Filter>;
};


export type GovernorProposalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Proposal_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Proposal_Filter>;
};


export type GovernorVotecastArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteCast_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteCast_Filter>;
};

export type Governor_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Governor_Filter>>>;
  asAccount: InputMaybe<Scalars['String']['input']>;
  asAccount_: InputMaybe<Account_Filter>;
  asAccount_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_gt: InputMaybe<Scalars['String']['input']>;
  asAccount_gte: InputMaybe<Scalars['String']['input']>;
  asAccount_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt: InputMaybe<Scalars['String']['input']>;
  asAccount_lte: InputMaybe<Scalars['String']['input']>;
  asAccount_not: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  mode: InputMaybe<Scalars['String']['input']>;
  mode_contains: InputMaybe<Scalars['String']['input']>;
  mode_contains_nocase: InputMaybe<Scalars['String']['input']>;
  mode_ends_with: InputMaybe<Scalars['String']['input']>;
  mode_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  mode_gt: InputMaybe<Scalars['String']['input']>;
  mode_gte: InputMaybe<Scalars['String']['input']>;
  mode_in: InputMaybe<Array<Scalars['String']['input']>>;
  mode_lt: InputMaybe<Scalars['String']['input']>;
  mode_lte: InputMaybe<Scalars['String']['input']>;
  mode_not: InputMaybe<Scalars['String']['input']>;
  mode_not_contains: InputMaybe<Scalars['String']['input']>;
  mode_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  mode_not_ends_with: InputMaybe<Scalars['String']['input']>;
  mode_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  mode_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  mode_not_starts_with: InputMaybe<Scalars['String']['input']>;
  mode_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  mode_starts_with: InputMaybe<Scalars['String']['input']>;
  mode_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<Governor_Filter>>>;
  proposalCanceled_: InputMaybe<ProposalCanceled_Filter>;
  proposalCreated_: InputMaybe<ProposalCreated_Filter>;
  proposalExecuted_: InputMaybe<ProposalExecuted_Filter>;
  proposalQueued_: InputMaybe<ProposalQueued_Filter>;
  proposals_: InputMaybe<Proposal_Filter>;
  votecast_: InputMaybe<VoteCast_Filter>;
};

export enum Governor_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  Id = 'id',
  Mode = 'mode',
  ProposalCanceled = 'proposalCanceled',
  ProposalCreated = 'proposalCreated',
  ProposalExecuted = 'proposalExecuted',
  ProposalQueued = 'proposalQueued',
  Proposals = 'proposals',
  Votecast = 'votecast'
}

export type Lock = {
  __typename?: 'Lock';
  amount: Scalars['BigInt']['output'];
  cliff: Scalars['Int']['output'];
  delegate: Account;
  id: Scalars['ID']['output'];
  lockCreate: Array<LockCreate>;
  lockId: Scalars['BigInt']['output'];
  locking: Locking;
  owner: Account;
  relock: Array<Relock>;
  relocked: Scalars['Boolean']['output'];
  replacedBy: Maybe<Lock>;
  replaces: Maybe<Lock>;
  slope: Scalars['Int']['output'];
  time: Scalars['BigInt']['output'];
};


export type LockLockCreateArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LockCreate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<LockCreate_Filter>;
};


export type LockRelockArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Relock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Relock_Filter>;
};

export type LockCreate = Event & {
  __typename?: 'LockCreate';
  emitter: Account;
  id: Scalars['ID']['output'];
  lock: Lock;
  locking: Locking;
  owner: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type LockCreate_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<LockCreate_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  lock: InputMaybe<Scalars['String']['input']>;
  lock_: InputMaybe<Lock_Filter>;
  lock_contains: InputMaybe<Scalars['String']['input']>;
  lock_contains_nocase: InputMaybe<Scalars['String']['input']>;
  lock_ends_with: InputMaybe<Scalars['String']['input']>;
  lock_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  lock_gt: InputMaybe<Scalars['String']['input']>;
  lock_gte: InputMaybe<Scalars['String']['input']>;
  lock_in: InputMaybe<Array<Scalars['String']['input']>>;
  lock_lt: InputMaybe<Scalars['String']['input']>;
  lock_lte: InputMaybe<Scalars['String']['input']>;
  lock_not: InputMaybe<Scalars['String']['input']>;
  lock_not_contains: InputMaybe<Scalars['String']['input']>;
  lock_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  lock_not_ends_with: InputMaybe<Scalars['String']['input']>;
  lock_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  lock_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  lock_not_starts_with: InputMaybe<Scalars['String']['input']>;
  lock_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  lock_starts_with: InputMaybe<Scalars['String']['input']>;
  lock_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking: InputMaybe<Scalars['String']['input']>;
  locking_: InputMaybe<Locking_Filter>;
  locking_contains: InputMaybe<Scalars['String']['input']>;
  locking_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_gt: InputMaybe<Scalars['String']['input']>;
  locking_gte: InputMaybe<Scalars['String']['input']>;
  locking_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_lt: InputMaybe<Scalars['String']['input']>;
  locking_lte: InputMaybe<Scalars['String']['input']>;
  locking_not: InputMaybe<Scalars['String']['input']>;
  locking_not_contains: InputMaybe<Scalars['String']['input']>;
  locking_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_not_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<LockCreate_Filter>>>;
  owner: InputMaybe<Scalars['String']['input']>;
  owner_: InputMaybe<Account_Filter>;
  owner_contains: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_gt: InputMaybe<Scalars['String']['input']>;
  owner_gte: InputMaybe<Scalars['String']['input']>;
  owner_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt: InputMaybe<Scalars['String']['input']>;
  owner_lte: InputMaybe<Scalars['String']['input']>;
  owner_not: InputMaybe<Scalars['String']['input']>;
  owner_not_contains: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum LockCreate_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Lock = 'lock',
  LockAmount = 'lock__amount',
  LockCliff = 'lock__cliff',
  LockId = 'lock__id',
  LockLockId = 'lock__lockId',
  LockRelocked = 'lock__relocked',
  LockSlope = 'lock__slope',
  LockTime = 'lock__time',
  Locking = 'locking',
  LockingId = 'locking__id',
  LockingMode = 'locking__mode',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type Lock_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte: InputMaybe<Scalars['BigInt']['input']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte: InputMaybe<Scalars['BigInt']['input']>;
  amount_not: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and: InputMaybe<Array<InputMaybe<Lock_Filter>>>;
  cliff: InputMaybe<Scalars['Int']['input']>;
  cliff_gt: InputMaybe<Scalars['Int']['input']>;
  cliff_gte: InputMaybe<Scalars['Int']['input']>;
  cliff_in: InputMaybe<Array<Scalars['Int']['input']>>;
  cliff_lt: InputMaybe<Scalars['Int']['input']>;
  cliff_lte: InputMaybe<Scalars['Int']['input']>;
  cliff_not: InputMaybe<Scalars['Int']['input']>;
  cliff_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  delegate: InputMaybe<Scalars['String']['input']>;
  delegate_: InputMaybe<Account_Filter>;
  delegate_contains: InputMaybe<Scalars['String']['input']>;
  delegate_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_gt: InputMaybe<Scalars['String']['input']>;
  delegate_gte: InputMaybe<Scalars['String']['input']>;
  delegate_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_lt: InputMaybe<Scalars['String']['input']>;
  delegate_lte: InputMaybe<Scalars['String']['input']>;
  delegate_not: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegate_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  lockCreate_: InputMaybe<LockCreate_Filter>;
  lockId: InputMaybe<Scalars['BigInt']['input']>;
  lockId_gt: InputMaybe<Scalars['BigInt']['input']>;
  lockId_gte: InputMaybe<Scalars['BigInt']['input']>;
  lockId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockId_lt: InputMaybe<Scalars['BigInt']['input']>;
  lockId_lte: InputMaybe<Scalars['BigInt']['input']>;
  lockId_not: InputMaybe<Scalars['BigInt']['input']>;
  lockId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  locking: InputMaybe<Scalars['String']['input']>;
  locking_: InputMaybe<Locking_Filter>;
  locking_contains: InputMaybe<Scalars['String']['input']>;
  locking_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_gt: InputMaybe<Scalars['String']['input']>;
  locking_gte: InputMaybe<Scalars['String']['input']>;
  locking_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_lt: InputMaybe<Scalars['String']['input']>;
  locking_lte: InputMaybe<Scalars['String']['input']>;
  locking_not: InputMaybe<Scalars['String']['input']>;
  locking_not_contains: InputMaybe<Scalars['String']['input']>;
  locking_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_not_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<Lock_Filter>>>;
  owner: InputMaybe<Scalars['String']['input']>;
  owner_: InputMaybe<Account_Filter>;
  owner_contains: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_gt: InputMaybe<Scalars['String']['input']>;
  owner_gte: InputMaybe<Scalars['String']['input']>;
  owner_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt: InputMaybe<Scalars['String']['input']>;
  owner_lte: InputMaybe<Scalars['String']['input']>;
  owner_not: InputMaybe<Scalars['String']['input']>;
  owner_not_contains: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  relock_: InputMaybe<Relock_Filter>;
  relocked: InputMaybe<Scalars['Boolean']['input']>;
  relocked_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  relocked_not: InputMaybe<Scalars['Boolean']['input']>;
  relocked_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  replacedBy: InputMaybe<Scalars['String']['input']>;
  replacedBy_: InputMaybe<Lock_Filter>;
  replacedBy_contains: InputMaybe<Scalars['String']['input']>;
  replacedBy_contains_nocase: InputMaybe<Scalars['String']['input']>;
  replacedBy_ends_with: InputMaybe<Scalars['String']['input']>;
  replacedBy_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  replacedBy_gt: InputMaybe<Scalars['String']['input']>;
  replacedBy_gte: InputMaybe<Scalars['String']['input']>;
  replacedBy_in: InputMaybe<Array<Scalars['String']['input']>>;
  replacedBy_lt: InputMaybe<Scalars['String']['input']>;
  replacedBy_lte: InputMaybe<Scalars['String']['input']>;
  replacedBy_not: InputMaybe<Scalars['String']['input']>;
  replacedBy_not_contains: InputMaybe<Scalars['String']['input']>;
  replacedBy_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  replacedBy_not_ends_with: InputMaybe<Scalars['String']['input']>;
  replacedBy_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  replacedBy_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  replacedBy_not_starts_with: InputMaybe<Scalars['String']['input']>;
  replacedBy_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  replacedBy_starts_with: InputMaybe<Scalars['String']['input']>;
  replacedBy_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  replaces: InputMaybe<Scalars['String']['input']>;
  replaces_: InputMaybe<Lock_Filter>;
  replaces_contains: InputMaybe<Scalars['String']['input']>;
  replaces_contains_nocase: InputMaybe<Scalars['String']['input']>;
  replaces_ends_with: InputMaybe<Scalars['String']['input']>;
  replaces_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  replaces_gt: InputMaybe<Scalars['String']['input']>;
  replaces_gte: InputMaybe<Scalars['String']['input']>;
  replaces_in: InputMaybe<Array<Scalars['String']['input']>>;
  replaces_lt: InputMaybe<Scalars['String']['input']>;
  replaces_lte: InputMaybe<Scalars['String']['input']>;
  replaces_not: InputMaybe<Scalars['String']['input']>;
  replaces_not_contains: InputMaybe<Scalars['String']['input']>;
  replaces_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  replaces_not_ends_with: InputMaybe<Scalars['String']['input']>;
  replaces_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  replaces_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  replaces_not_starts_with: InputMaybe<Scalars['String']['input']>;
  replaces_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  replaces_starts_with: InputMaybe<Scalars['String']['input']>;
  replaces_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  slope: InputMaybe<Scalars['Int']['input']>;
  slope_gt: InputMaybe<Scalars['Int']['input']>;
  slope_gte: InputMaybe<Scalars['Int']['input']>;
  slope_in: InputMaybe<Array<Scalars['Int']['input']>>;
  slope_lt: InputMaybe<Scalars['Int']['input']>;
  slope_lte: InputMaybe<Scalars['Int']['input']>;
  slope_not: InputMaybe<Scalars['Int']['input']>;
  slope_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  time: InputMaybe<Scalars['BigInt']['input']>;
  time_gt: InputMaybe<Scalars['BigInt']['input']>;
  time_gte: InputMaybe<Scalars['BigInt']['input']>;
  time_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  time_lt: InputMaybe<Scalars['BigInt']['input']>;
  time_lte: InputMaybe<Scalars['BigInt']['input']>;
  time_not: InputMaybe<Scalars['BigInt']['input']>;
  time_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Lock_OrderBy {
  Amount = 'amount',
  Cliff = 'cliff',
  Delegate = 'delegate',
  DelegateId = 'delegate__id',
  Id = 'id',
  LockCreate = 'lockCreate',
  LockId = 'lockId',
  Locking = 'locking',
  LockingId = 'locking__id',
  LockingMode = 'locking__mode',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Relock = 'relock',
  Relocked = 'relocked',
  ReplacedBy = 'replacedBy',
  ReplacedByAmount = 'replacedBy__amount',
  ReplacedByCliff = 'replacedBy__cliff',
  ReplacedById = 'replacedBy__id',
  ReplacedByLockId = 'replacedBy__lockId',
  ReplacedByRelocked = 'replacedBy__relocked',
  ReplacedBySlope = 'replacedBy__slope',
  ReplacedByTime = 'replacedBy__time',
  Replaces = 'replaces',
  ReplacesAmount = 'replaces__amount',
  ReplacesCliff = 'replaces__cliff',
  ReplacesId = 'replaces__id',
  ReplacesLockId = 'replaces__lockId',
  ReplacesRelocked = 'replaces__relocked',
  ReplacesSlope = 'replaces__slope',
  ReplacesTime = 'replaces__time',
  Slope = 'slope',
  Time = 'time'
}

export type Locking = {
  __typename?: 'Locking';
  asAccount: Account;
  delegate: Array<Delegate>;
  id: Scalars['Bytes']['output'];
  lockCreate: Array<LockCreate>;
  locks: Array<Lock>;
  mode: Maybe<Scalars['String']['output']>;
  relock: Array<Relock>;
  withdraw: Array<Withdraw>;
};


export type LockingDelegateArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Delegate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Delegate_Filter>;
};


export type LockingLockCreateArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LockCreate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<LockCreate_Filter>;
};


export type LockingLocksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Lock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Lock_Filter>;
};


export type LockingRelockArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Relock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Relock_Filter>;
};


export type LockingWithdrawArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Withdraw_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Withdraw_Filter>;
};

export type Locking_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Locking_Filter>>>;
  asAccount: InputMaybe<Scalars['String']['input']>;
  asAccount_: InputMaybe<Account_Filter>;
  asAccount_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_gt: InputMaybe<Scalars['String']['input']>;
  asAccount_gte: InputMaybe<Scalars['String']['input']>;
  asAccount_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt: InputMaybe<Scalars['String']['input']>;
  asAccount_lte: InputMaybe<Scalars['String']['input']>;
  asAccount_not: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegate_: InputMaybe<Delegate_Filter>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lockCreate_: InputMaybe<LockCreate_Filter>;
  locks_: InputMaybe<Lock_Filter>;
  mode: InputMaybe<Scalars['String']['input']>;
  mode_contains: InputMaybe<Scalars['String']['input']>;
  mode_contains_nocase: InputMaybe<Scalars['String']['input']>;
  mode_ends_with: InputMaybe<Scalars['String']['input']>;
  mode_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  mode_gt: InputMaybe<Scalars['String']['input']>;
  mode_gte: InputMaybe<Scalars['String']['input']>;
  mode_in: InputMaybe<Array<Scalars['String']['input']>>;
  mode_lt: InputMaybe<Scalars['String']['input']>;
  mode_lte: InputMaybe<Scalars['String']['input']>;
  mode_not: InputMaybe<Scalars['String']['input']>;
  mode_not_contains: InputMaybe<Scalars['String']['input']>;
  mode_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  mode_not_ends_with: InputMaybe<Scalars['String']['input']>;
  mode_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  mode_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  mode_not_starts_with: InputMaybe<Scalars['String']['input']>;
  mode_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  mode_starts_with: InputMaybe<Scalars['String']['input']>;
  mode_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<Locking_Filter>>>;
  relock_: InputMaybe<Relock_Filter>;
  withdraw_: InputMaybe<Withdraw_Filter>;
};

export enum Locking_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  Delegate = 'delegate',
  Id = 'id',
  LockCreate = 'lockCreate',
  Locks = 'locks',
  Mode = 'mode',
  Relock = 'relock',
  Withdraw = 'withdraw'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Participant = {
  __typename?: 'Participant';
  address: Scalars['String']['output'];
  weight: Scalars['BigInt']['output'];
};

export type Proposal = {
  __typename?: 'Proposal';
  calls: Array<ProposalCall>;
  canceled: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  endBlock: Scalars['BigInt']['output'];
  eta: Maybe<Scalars['BigInt']['output']>;
  executed: Scalars['Boolean']['output'];
  governor: Governor;
  id: Scalars['ID']['output'];
  metadata: ProposalMetadata;
  proposalCanceled: Array<ProposalCanceled>;
  proposalCreated: Array<ProposalCreated>;
  proposalExecuted: Array<ProposalExecuted>;
  proposalId: Scalars['BigInt']['output'];
  proposalQueued: Array<ProposalQueued>;
  proposer: Account;
  queued: Scalars['Boolean']['output'];
  receipts: Array<VoteReceipt>;
  startBlock: Scalars['BigInt']['output'];
  state: ProposalState;
  supports: Array<ProposalSupport>;
  votecast: Array<VoteCast>;
  votes: ProposalVotes;
};


export type ProposalCallsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalCall_Filter>;
};


export type ProposalProposalCanceledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCanceled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalCanceled_Filter>;
};


export type ProposalProposalCreatedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCreated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalCreated_Filter>;
};


export type ProposalProposalExecutedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalExecuted_Filter>;
};


export type ProposalProposalQueuedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalQueued_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalQueued_Filter>;
};


export type ProposalReceiptsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteReceipt_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteReceipt_Filter>;
};


export type ProposalSupportsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalSupport_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<ProposalSupport_Filter>;
};


export type ProposalVotecastArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteCast_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteCast_Filter>;
};

export type ProposalCall = {
  __typename?: 'ProposalCall';
  calldata: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  proposal: Proposal;
  signature: Scalars['String']['output'];
  target: Account;
  value: Scalars['BigDecimal']['output'];
};

export type ProposalCall_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProposalCall_Filter>>>;
  calldata: InputMaybe<Scalars['Bytes']['input']>;
  calldata_contains: InputMaybe<Scalars['Bytes']['input']>;
  calldata_gt: InputMaybe<Scalars['Bytes']['input']>;
  calldata_gte: InputMaybe<Scalars['Bytes']['input']>;
  calldata_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldata_lt: InputMaybe<Scalars['Bytes']['input']>;
  calldata_lte: InputMaybe<Scalars['Bytes']['input']>;
  calldata_not: InputMaybe<Scalars['Bytes']['input']>;
  calldata_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  calldata_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  index: InputMaybe<Scalars['Int']['input']>;
  index_gt: InputMaybe<Scalars['Int']['input']>;
  index_gte: InputMaybe<Scalars['Int']['input']>;
  index_in: InputMaybe<Array<Scalars['Int']['input']>>;
  index_lt: InputMaybe<Scalars['Int']['input']>;
  index_lte: InputMaybe<Scalars['Int']['input']>;
  index_not: InputMaybe<Scalars['Int']['input']>;
  index_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProposalCall_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  signature: InputMaybe<Scalars['String']['input']>;
  signature_contains: InputMaybe<Scalars['String']['input']>;
  signature_contains_nocase: InputMaybe<Scalars['String']['input']>;
  signature_ends_with: InputMaybe<Scalars['String']['input']>;
  signature_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  signature_gt: InputMaybe<Scalars['String']['input']>;
  signature_gte: InputMaybe<Scalars['String']['input']>;
  signature_in: InputMaybe<Array<Scalars['String']['input']>>;
  signature_lt: InputMaybe<Scalars['String']['input']>;
  signature_lte: InputMaybe<Scalars['String']['input']>;
  signature_not: InputMaybe<Scalars['String']['input']>;
  signature_not_contains: InputMaybe<Scalars['String']['input']>;
  signature_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  signature_not_ends_with: InputMaybe<Scalars['String']['input']>;
  signature_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  signature_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  signature_not_starts_with: InputMaybe<Scalars['String']['input']>;
  signature_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  signature_starts_with: InputMaybe<Scalars['String']['input']>;
  signature_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  target: InputMaybe<Scalars['String']['input']>;
  target_: InputMaybe<Account_Filter>;
  target_contains: InputMaybe<Scalars['String']['input']>;
  target_contains_nocase: InputMaybe<Scalars['String']['input']>;
  target_ends_with: InputMaybe<Scalars['String']['input']>;
  target_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  target_gt: InputMaybe<Scalars['String']['input']>;
  target_gte: InputMaybe<Scalars['String']['input']>;
  target_in: InputMaybe<Array<Scalars['String']['input']>>;
  target_lt: InputMaybe<Scalars['String']['input']>;
  target_lte: InputMaybe<Scalars['String']['input']>;
  target_not: InputMaybe<Scalars['String']['input']>;
  target_not_contains: InputMaybe<Scalars['String']['input']>;
  target_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  target_not_ends_with: InputMaybe<Scalars['String']['input']>;
  target_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  target_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  target_not_starts_with: InputMaybe<Scalars['String']['input']>;
  target_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  target_starts_with: InputMaybe<Scalars['String']['input']>;
  target_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  value: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gt: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum ProposalCall_OrderBy {
  Calldata = 'calldata',
  Id = 'id',
  Index = 'index',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Signature = 'signature',
  Target = 'target',
  TargetId = 'target__id',
  Value = 'value'
}

export type ProposalCanceled = Event & {
  __typename?: 'ProposalCanceled';
  emitter: Account;
  governor: Governor;
  id: Scalars['ID']['output'];
  proposal: Proposal;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type ProposalCanceled_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProposalCanceled_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor: InputMaybe<Scalars['String']['input']>;
  governor_: InputMaybe<Governor_Filter>;
  governor_contains: InputMaybe<Scalars['String']['input']>;
  governor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_gt: InputMaybe<Scalars['String']['input']>;
  governor_gte: InputMaybe<Scalars['String']['input']>;
  governor_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_lt: InputMaybe<Scalars['String']['input']>;
  governor_lte: InputMaybe<Scalars['String']['input']>;
  governor_not: InputMaybe<Scalars['String']['input']>;
  governor_not_contains: InputMaybe<Scalars['String']['input']>;
  governor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProposalCanceled_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum ProposalCanceled_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Governor = 'governor',
  GovernorId = 'governor__id',
  GovernorMode = 'governor__mode',
  Id = 'id',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type ProposalCreated = Event & {
  __typename?: 'ProposalCreated';
  emitter: Account;
  governor: Governor;
  id: Scalars['ID']['output'];
  proposal: Proposal;
  proposer: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type ProposalCreated_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProposalCreated_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor: InputMaybe<Scalars['String']['input']>;
  governor_: InputMaybe<Governor_Filter>;
  governor_contains: InputMaybe<Scalars['String']['input']>;
  governor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_gt: InputMaybe<Scalars['String']['input']>;
  governor_gte: InputMaybe<Scalars['String']['input']>;
  governor_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_lt: InputMaybe<Scalars['String']['input']>;
  governor_lte: InputMaybe<Scalars['String']['input']>;
  governor_not: InputMaybe<Scalars['String']['input']>;
  governor_not_contains: InputMaybe<Scalars['String']['input']>;
  governor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProposalCreated_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer: InputMaybe<Scalars['String']['input']>;
  proposer_: InputMaybe<Account_Filter>;
  proposer_contains: InputMaybe<Scalars['String']['input']>;
  proposer_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_gt: InputMaybe<Scalars['String']['input']>;
  proposer_gte: InputMaybe<Scalars['String']['input']>;
  proposer_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_lt: InputMaybe<Scalars['String']['input']>;
  proposer_lte: InputMaybe<Scalars['String']['input']>;
  proposer_not: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposer_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum ProposalCreated_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Governor = 'governor',
  GovernorId = 'governor__id',
  GovernorMode = 'governor__mode',
  Id = 'id',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Proposer = 'proposer',
  ProposerId = 'proposer__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type ProposalExecuted = Event & {
  __typename?: 'ProposalExecuted';
  emitter: Account;
  governor: Governor;
  id: Scalars['ID']['output'];
  proposal: Proposal;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type ProposalExecuted_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProposalExecuted_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor: InputMaybe<Scalars['String']['input']>;
  governor_: InputMaybe<Governor_Filter>;
  governor_contains: InputMaybe<Scalars['String']['input']>;
  governor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_gt: InputMaybe<Scalars['String']['input']>;
  governor_gte: InputMaybe<Scalars['String']['input']>;
  governor_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_lt: InputMaybe<Scalars['String']['input']>;
  governor_lte: InputMaybe<Scalars['String']['input']>;
  governor_not: InputMaybe<Scalars['String']['input']>;
  governor_not_contains: InputMaybe<Scalars['String']['input']>;
  governor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProposalExecuted_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum ProposalExecuted_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Governor = 'governor',
  GovernorId = 'governor__id',
  GovernorMode = 'governor__mode',
  Id = 'id',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type ProposalMetadata = {
  __typename?: 'ProposalMetadata';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProposalQueued = Event & {
  __typename?: 'ProposalQueued';
  emitter: Account;
  eta: Scalars['BigInt']['output'];
  governor: Governor;
  id: Scalars['ID']['output'];
  proposal: Proposal;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type ProposalQueued_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProposalQueued_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  eta: InputMaybe<Scalars['BigInt']['input']>;
  eta_gt: InputMaybe<Scalars['BigInt']['input']>;
  eta_gte: InputMaybe<Scalars['BigInt']['input']>;
  eta_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eta_lt: InputMaybe<Scalars['BigInt']['input']>;
  eta_lte: InputMaybe<Scalars['BigInt']['input']>;
  eta_not: InputMaybe<Scalars['BigInt']['input']>;
  eta_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  governor: InputMaybe<Scalars['String']['input']>;
  governor_: InputMaybe<Governor_Filter>;
  governor_contains: InputMaybe<Scalars['String']['input']>;
  governor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_gt: InputMaybe<Scalars['String']['input']>;
  governor_gte: InputMaybe<Scalars['String']['input']>;
  governor_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_lt: InputMaybe<Scalars['String']['input']>;
  governor_lte: InputMaybe<Scalars['String']['input']>;
  governor_not: InputMaybe<Scalars['String']['input']>;
  governor_not_contains: InputMaybe<Scalars['String']['input']>;
  governor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProposalQueued_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum ProposalQueued_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Eta = 'eta',
  Governor = 'governor',
  GovernorId = 'governor__id',
  GovernorMode = 'governor__mode',
  Id = 'id',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export enum ProposalState {
  Active = 'Active',
  Canceled = 'Canceled',
  Defeated = 'Defeated',
  Executed = 'Executed',
  Expired = 'Expired',
  NoState = 'NoState',
  Pending = 'Pending',
  Queued = 'Queued',
  Succeeded = 'Succeeded'
}

export type ProposalSupport = {
  __typename?: 'ProposalSupport';
  id: Scalars['ID']['output'];
  proposal: Proposal;
  support: Scalars['Int']['output'];
  votes: Array<VoteReceipt>;
  weight: Scalars['BigInt']['output'];
};


export type ProposalSupportVotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteReceipt_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteReceipt_Filter>;
};

export type ProposalSupport_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProposalSupport_Filter>>>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<ProposalSupport_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  support: InputMaybe<Scalars['Int']['input']>;
  support_gt: InputMaybe<Scalars['Int']['input']>;
  support_gte: InputMaybe<Scalars['Int']['input']>;
  support_in: InputMaybe<Array<Scalars['Int']['input']>>;
  support_lt: InputMaybe<Scalars['Int']['input']>;
  support_lte: InputMaybe<Scalars['Int']['input']>;
  support_not: InputMaybe<Scalars['Int']['input']>;
  support_not_in: InputMaybe<Array<Scalars['Int']['input']>>;
  votes_: InputMaybe<VoteReceipt_Filter>;
  weight: InputMaybe<Scalars['BigInt']['input']>;
  weight_gt: InputMaybe<Scalars['BigInt']['input']>;
  weight_gte: InputMaybe<Scalars['BigInt']['input']>;
  weight_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weight_lt: InputMaybe<Scalars['BigInt']['input']>;
  weight_lte: InputMaybe<Scalars['BigInt']['input']>;
  weight_not: InputMaybe<Scalars['BigInt']['input']>;
  weight_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ProposalSupport_OrderBy {
  Id = 'id',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Support = 'support',
  Votes = 'votes',
  Weight = 'weight'
}

export type ProposalVotes = {
  __typename?: 'ProposalVotes';
  abstain: VoteType;
  against: VoteType;
  for: VoteType;
  total: Scalars['BigInt']['output'];
};

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  calls_: InputMaybe<ProposalCall_Filter>;
  canceled: InputMaybe<Scalars['Boolean']['input']>;
  canceled_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  canceled_not: InputMaybe<Scalars['Boolean']['input']>;
  canceled_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase: InputMaybe<Scalars['String']['input']>;
  description_ends_with: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  description_gt: InputMaybe<Scalars['String']['input']>;
  description_gte: InputMaybe<Scalars['String']['input']>;
  description_in: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt: InputMaybe<Scalars['String']['input']>;
  description_lte: InputMaybe<Scalars['String']['input']>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  description_starts_with: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  endBlock: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gt: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gte: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock_lt: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lte: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eta: InputMaybe<Scalars['BigInt']['input']>;
  eta_gt: InputMaybe<Scalars['BigInt']['input']>;
  eta_gte: InputMaybe<Scalars['BigInt']['input']>;
  eta_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eta_lt: InputMaybe<Scalars['BigInt']['input']>;
  eta_lte: InputMaybe<Scalars['BigInt']['input']>;
  eta_not: InputMaybe<Scalars['BigInt']['input']>;
  eta_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executed: InputMaybe<Scalars['Boolean']['input']>;
  executed_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  executed_not: InputMaybe<Scalars['Boolean']['input']>;
  executed_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  governor: InputMaybe<Scalars['String']['input']>;
  governor_: InputMaybe<Governor_Filter>;
  governor_contains: InputMaybe<Scalars['String']['input']>;
  governor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_gt: InputMaybe<Scalars['String']['input']>;
  governor_gte: InputMaybe<Scalars['String']['input']>;
  governor_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_lt: InputMaybe<Scalars['String']['input']>;
  governor_lte: InputMaybe<Scalars['String']['input']>;
  governor_not: InputMaybe<Scalars['String']['input']>;
  governor_not_contains: InputMaybe<Scalars['String']['input']>;
  governor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  proposalCanceled_: InputMaybe<ProposalCanceled_Filter>;
  proposalCreated_: InputMaybe<ProposalCreated_Filter>;
  proposalExecuted_: InputMaybe<ProposalExecuted_Filter>;
  proposalId: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_gt: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_gte: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalId_lt: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_lte: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_not: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalQueued_: InputMaybe<ProposalQueued_Filter>;
  proposer: InputMaybe<Scalars['String']['input']>;
  proposer_: InputMaybe<Account_Filter>;
  proposer_contains: InputMaybe<Scalars['String']['input']>;
  proposer_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_gt: InputMaybe<Scalars['String']['input']>;
  proposer_gte: InputMaybe<Scalars['String']['input']>;
  proposer_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_lt: InputMaybe<Scalars['String']['input']>;
  proposer_lte: InputMaybe<Scalars['String']['input']>;
  proposer_not: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposer_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  queued: InputMaybe<Scalars['Boolean']['input']>;
  queued_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  queued_not: InputMaybe<Scalars['Boolean']['input']>;
  queued_not_in: InputMaybe<Array<Scalars['Boolean']['input']>>;
  receipts_: InputMaybe<VoteReceipt_Filter>;
  startBlock: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_lt: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supports_: InputMaybe<ProposalSupport_Filter>;
  votecast_: InputMaybe<VoteCast_Filter>;
};

export enum Proposal_OrderBy {
  Calls = 'calls',
  Canceled = 'canceled',
  Description = 'description',
  EndBlock = 'endBlock',
  Eta = 'eta',
  Executed = 'executed',
  Governor = 'governor',
  GovernorId = 'governor__id',
  GovernorMode = 'governor__mode',
  Id = 'id',
  ProposalCanceled = 'proposalCanceled',
  ProposalCreated = 'proposalCreated',
  ProposalExecuted = 'proposalExecuted',
  ProposalId = 'proposalId',
  ProposalQueued = 'proposalQueued',
  Proposer = 'proposer',
  ProposerId = 'proposer__id',
  Queued = 'queued',
  Receipts = 'receipts',
  StartBlock = 'startBlock',
  Supports = 'supports',
  Votecast = 'votecast'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  accessControl: Maybe<AccessControl>;
  accessControlRole: Maybe<AccessControlRole>;
  accessControlRoleMember: Maybe<AccessControlRoleMember>;
  accessControlRoleMembers: Array<AccessControlRoleMember>;
  accessControlRoles: Array<AccessControlRole>;
  accessControls: Array<AccessControl>;
  account: Maybe<Account>;
  accounts: Array<Account>;
  delegate: Maybe<Delegate>;
  delegateChanged: Maybe<DelegateChanged>;
  delegateChangeds: Array<DelegateChanged>;
  delegateVotesChanged: Maybe<DelegateVotesChanged>;
  delegateVotesChangeds: Array<DelegateVotesChanged>;
  delegates: Array<Delegate>;
  event: Maybe<Event>;
  events: Array<Event>;
  governor: Maybe<Governor>;
  governors: Array<Governor>;
  lock: Maybe<Lock>;
  lockCreate: Maybe<LockCreate>;
  lockCreates: Array<LockCreate>;
  locking: Maybe<Locking>;
  lockings: Array<Locking>;
  locks: Array<Lock>;
  proposal: Maybe<Proposal>;
  proposalCall: Maybe<ProposalCall>;
  proposalCalls: Array<ProposalCall>;
  proposalCanceled: Maybe<ProposalCanceled>;
  proposalCanceleds: Array<ProposalCanceled>;
  proposalCreated: Maybe<ProposalCreated>;
  proposalCreateds: Array<ProposalCreated>;
  proposalExecuted: Maybe<ProposalExecuted>;
  proposalExecuteds: Array<ProposalExecuted>;
  proposalQueued: Maybe<ProposalQueued>;
  proposalQueueds: Array<ProposalQueued>;
  proposalSupport: Maybe<ProposalSupport>;
  proposalSupports: Array<ProposalSupport>;
  proposals: Array<Proposal>;
  relock: Maybe<Relock>;
  relocks: Array<Relock>;
  role: Maybe<Role>;
  roleAdminChanged: Maybe<RoleAdminChanged>;
  roleAdminChangeds: Array<RoleAdminChanged>;
  roleGranted: Maybe<RoleGranted>;
  roleGranteds: Array<RoleGranted>;
  roleRevoked: Maybe<RoleRevoked>;
  roleRevokeds: Array<RoleRevoked>;
  roles: Array<Role>;
  timelock: Maybe<Timelock>;
  timelockCall: Maybe<TimelockCall>;
  timelockCalls: Array<TimelockCall>;
  timelockMinDelayChange: Maybe<TimelockMinDelayChange>;
  timelockMinDelayChanges: Array<TimelockMinDelayChange>;
  timelockOperation: Maybe<TimelockOperation>;
  timelockOperationCancelled: Maybe<TimelockOperationCancelled>;
  timelockOperationCancelleds: Array<TimelockOperationCancelled>;
  timelockOperationExecuted: Maybe<TimelockOperationExecuted>;
  timelockOperationExecuteds: Array<TimelockOperationExecuted>;
  timelockOperationScheduled: Maybe<TimelockOperationScheduled>;
  timelockOperationScheduleds: Array<TimelockOperationScheduled>;
  timelockOperations: Array<TimelockOperation>;
  timelocks: Array<Timelock>;
  transaction: Maybe<Transaction>;
  transactions: Array<Transaction>;
  voteCast: Maybe<VoteCast>;
  voteCasts: Array<VoteCast>;
  voteDelegation: Maybe<VoteDelegation>;
  voteDelegations: Array<VoteDelegation>;
  voteReceipt: Maybe<VoteReceipt>;
  voteReceipts: Array<VoteReceipt>;
  voteWeight: Maybe<VoteWeight>;
  voteWeights: Array<VoteWeight>;
  votingContract: Maybe<VotingContract>;
  votingContracts: Array<VotingContract>;
  withdraw: Maybe<Withdraw>;
  withdraws: Array<Withdraw>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type QueryAccessControlArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccessControlRoleArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccessControlRoleMemberArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccessControlRoleMembersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRoleMember_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AccessControlRoleMember_Filter>;
};


export type QueryAccessControlRolesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRole_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AccessControlRole_Filter>;
};


export type QueryAccessControlsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControl_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AccessControl_Filter>;
};


export type QueryAccountArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Account_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Account_Filter>;
};


export type QueryDelegateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDelegateChangedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDelegateChangedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DelegateChanged_Filter>;
};


export type QueryDelegateVotesChangedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDelegateVotesChangedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateVotesChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DelegateVotesChanged_Filter>;
};


export type QueryDelegatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Delegate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Delegate_Filter>;
};


export type QueryEventArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEventsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Event_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Event_Filter>;
};


export type QueryGovernorArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGovernorsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Governor_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Governor_Filter>;
};


export type QueryLockArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLockCreateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLockCreatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LockCreate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LockCreate_Filter>;
};


export type QueryLockingArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLockingsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Locking_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Locking_Filter>;
};


export type QueryLocksArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Lock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Lock_Filter>;
};


export type QueryProposalArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalCallArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalCallsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalCall_Filter>;
};


export type QueryProposalCanceledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalCanceledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCanceled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalCanceled_Filter>;
};


export type QueryProposalCreatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalCreatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCreated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalCreated_Filter>;
};


export type QueryProposalExecutedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalExecutedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalExecuted_Filter>;
};


export type QueryProposalQueuedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalQueuedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalQueued_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalQueued_Filter>;
};


export type QueryProposalSupportArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalSupportsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalSupport_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalSupport_Filter>;
};


export type QueryProposalsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Proposal_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Proposal_Filter>;
};


export type QueryRelockArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRelocksArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Relock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Relock_Filter>;
};


export type QueryRoleArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoleAdminChangedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoleAdminChangedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleAdminChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RoleAdminChanged_Filter>;
};


export type QueryRoleGrantedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoleGrantedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleGranted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RoleGranted_Filter>;
};


export type QueryRoleRevokedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoleRevokedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleRevoked_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RoleRevoked_Filter>;
};


export type QueryRolesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Role_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Role_Filter>;
};


export type QueryTimelockArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockCallArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockCallsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockCall_Filter>;
};


export type QueryTimelockMinDelayChangeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockMinDelayChangesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockMinDelayChange_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockMinDelayChange_Filter>;
};


export type QueryTimelockOperationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockOperationCancelledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockOperationCancelledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationCancelled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperationCancelled_Filter>;
};


export type QueryTimelockOperationExecutedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockOperationExecutedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperationExecuted_Filter>;
};


export type QueryTimelockOperationScheduledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTimelockOperationScheduledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationScheduled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperationScheduled_Filter>;
};


export type QueryTimelockOperationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperation_Filter>;
};


export type QueryTimelocksArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Timelock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Timelock_Filter>;
};


export type QueryTransactionArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Transaction_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transaction_Filter>;
};


export type QueryVoteCastArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVoteCastsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteCast_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteCast_Filter>;
};


export type QueryVoteDelegationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVoteDelegationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteDelegation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteDelegation_Filter>;
};


export type QueryVoteReceiptArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVoteReceiptsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteReceipt_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteReceipt_Filter>;
};


export type QueryVoteWeightArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVoteWeightsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteWeight_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteWeight_Filter>;
};


export type QueryVotingContractArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVotingContractsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VotingContract_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VotingContract_Filter>;
};


export type QueryWithdrawArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Withdraw_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Withdraw_Filter>;
};

export type Relock = Event & {
  __typename?: 'Relock';
  emitter: Account;
  id: Scalars['ID']['output'];
  locking: Locking;
  newLock: Lock;
  oldLock: Lock;
  owner: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type Relock_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Relock_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  locking: InputMaybe<Scalars['String']['input']>;
  locking_: InputMaybe<Locking_Filter>;
  locking_contains: InputMaybe<Scalars['String']['input']>;
  locking_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_gt: InputMaybe<Scalars['String']['input']>;
  locking_gte: InputMaybe<Scalars['String']['input']>;
  locking_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_lt: InputMaybe<Scalars['String']['input']>;
  locking_lte: InputMaybe<Scalars['String']['input']>;
  locking_not: InputMaybe<Scalars['String']['input']>;
  locking_not_contains: InputMaybe<Scalars['String']['input']>;
  locking_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_not_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  newLock: InputMaybe<Scalars['String']['input']>;
  newLock_: InputMaybe<Lock_Filter>;
  newLock_contains: InputMaybe<Scalars['String']['input']>;
  newLock_contains_nocase: InputMaybe<Scalars['String']['input']>;
  newLock_ends_with: InputMaybe<Scalars['String']['input']>;
  newLock_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  newLock_gt: InputMaybe<Scalars['String']['input']>;
  newLock_gte: InputMaybe<Scalars['String']['input']>;
  newLock_in: InputMaybe<Array<Scalars['String']['input']>>;
  newLock_lt: InputMaybe<Scalars['String']['input']>;
  newLock_lte: InputMaybe<Scalars['String']['input']>;
  newLock_not: InputMaybe<Scalars['String']['input']>;
  newLock_not_contains: InputMaybe<Scalars['String']['input']>;
  newLock_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  newLock_not_ends_with: InputMaybe<Scalars['String']['input']>;
  newLock_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  newLock_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  newLock_not_starts_with: InputMaybe<Scalars['String']['input']>;
  newLock_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  newLock_starts_with: InputMaybe<Scalars['String']['input']>;
  newLock_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  oldLock: InputMaybe<Scalars['String']['input']>;
  oldLock_: InputMaybe<Lock_Filter>;
  oldLock_contains: InputMaybe<Scalars['String']['input']>;
  oldLock_contains_nocase: InputMaybe<Scalars['String']['input']>;
  oldLock_ends_with: InputMaybe<Scalars['String']['input']>;
  oldLock_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  oldLock_gt: InputMaybe<Scalars['String']['input']>;
  oldLock_gte: InputMaybe<Scalars['String']['input']>;
  oldLock_in: InputMaybe<Array<Scalars['String']['input']>>;
  oldLock_lt: InputMaybe<Scalars['String']['input']>;
  oldLock_lte: InputMaybe<Scalars['String']['input']>;
  oldLock_not: InputMaybe<Scalars['String']['input']>;
  oldLock_not_contains: InputMaybe<Scalars['String']['input']>;
  oldLock_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  oldLock_not_ends_with: InputMaybe<Scalars['String']['input']>;
  oldLock_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  oldLock_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  oldLock_not_starts_with: InputMaybe<Scalars['String']['input']>;
  oldLock_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  oldLock_starts_with: InputMaybe<Scalars['String']['input']>;
  oldLock_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<Relock_Filter>>>;
  owner: InputMaybe<Scalars['String']['input']>;
  owner_: InputMaybe<Account_Filter>;
  owner_contains: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_gt: InputMaybe<Scalars['String']['input']>;
  owner_gte: InputMaybe<Scalars['String']['input']>;
  owner_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt: InputMaybe<Scalars['String']['input']>;
  owner_lte: InputMaybe<Scalars['String']['input']>;
  owner_not: InputMaybe<Scalars['String']['input']>;
  owner_not_contains: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum Relock_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Locking = 'locking',
  LockingId = 'locking__id',
  LockingMode = 'locking__mode',
  NewLock = 'newLock',
  NewLockAmount = 'newLock__amount',
  NewLockCliff = 'newLock__cliff',
  NewLockId = 'newLock__id',
  NewLockLockId = 'newLock__lockId',
  NewLockRelocked = 'newLock__relocked',
  NewLockSlope = 'newLock__slope',
  NewLockTime = 'newLock__time',
  OldLock = 'oldLock',
  OldLockAmount = 'oldLock__amount',
  OldLockCliff = 'oldLock__cliff',
  OldLockId = 'oldLock__id',
  OldLockLockId = 'oldLock__lockId',
  OldLockRelocked = 'oldLock__relocked',
  OldLockSlope = 'oldLock__slope',
  OldLockTime = 'oldLock__time',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type Role = {
  __typename?: 'Role';
  id: Scalars['Bytes']['output'];
  roleOf: Array<AccessControlRole>;
};


export type RoleRoleOfArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRole_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<AccessControlRole_Filter>;
};

export type RoleAdminChanged = Event & {
  __typename?: 'RoleAdminChanged';
  emitter: Account;
  id: Scalars['ID']['output'];
  newAdminRole: AccessControlRole;
  previousAdminRole: AccessControlRole;
  role: AccessControlRole;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type RoleAdminChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<RoleAdminChanged_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  newAdminRole: InputMaybe<Scalars['String']['input']>;
  newAdminRole_: InputMaybe<AccessControlRole_Filter>;
  newAdminRole_contains: InputMaybe<Scalars['String']['input']>;
  newAdminRole_contains_nocase: InputMaybe<Scalars['String']['input']>;
  newAdminRole_ends_with: InputMaybe<Scalars['String']['input']>;
  newAdminRole_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  newAdminRole_gt: InputMaybe<Scalars['String']['input']>;
  newAdminRole_gte: InputMaybe<Scalars['String']['input']>;
  newAdminRole_in: InputMaybe<Array<Scalars['String']['input']>>;
  newAdminRole_lt: InputMaybe<Scalars['String']['input']>;
  newAdminRole_lte: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not_contains: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not_ends_with: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  newAdminRole_not_starts_with: InputMaybe<Scalars['String']['input']>;
  newAdminRole_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  newAdminRole_starts_with: InputMaybe<Scalars['String']['input']>;
  newAdminRole_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<RoleAdminChanged_Filter>>>;
  previousAdminRole: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_: InputMaybe<AccessControlRole_Filter>;
  previousAdminRole_contains: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_contains_nocase: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_ends_with: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_gt: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_gte: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_in: InputMaybe<Array<Scalars['String']['input']>>;
  previousAdminRole_lt: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_lte: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not_contains: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not_ends_with: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  previousAdminRole_not_starts_with: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_starts_with: InputMaybe<Scalars['String']['input']>;
  previousAdminRole_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  role_: InputMaybe<AccessControlRole_Filter>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_ends_with: InputMaybe<Scalars['String']['input']>;
  role_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_gt: InputMaybe<Scalars['String']['input']>;
  role_gte: InputMaybe<Scalars['String']['input']>;
  role_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_lt: InputMaybe<Scalars['String']['input']>;
  role_lte: InputMaybe<Scalars['String']['input']>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_starts_with: InputMaybe<Scalars['String']['input']>;
  role_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_starts_with: InputMaybe<Scalars['String']['input']>;
  role_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum RoleAdminChanged_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  NewAdminRole = 'newAdminRole',
  NewAdminRoleId = 'newAdminRole__id',
  PreviousAdminRole = 'previousAdminRole',
  PreviousAdminRoleId = 'previousAdminRole__id',
  Role = 'role',
  RoleId = 'role__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type RoleGranted = Event & {
  __typename?: 'RoleGranted';
  account: Account;
  emitter: Account;
  id: Scalars['ID']['output'];
  role: AccessControlRole;
  sender: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type RoleGranted_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']['input']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_ends_with: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_gt: InputMaybe<Scalars['String']['input']>;
  account_gte: InputMaybe<Scalars['String']['input']>;
  account_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt: InputMaybe<Scalars['String']['input']>;
  account_lte: InputMaybe<Scalars['String']['input']>;
  account_not: InputMaybe<Scalars['String']['input']>;
  account_not_contains: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_starts_with: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  and: InputMaybe<Array<InputMaybe<RoleGranted_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<RoleGranted_Filter>>>;
  role: InputMaybe<Scalars['String']['input']>;
  role_: InputMaybe<AccessControlRole_Filter>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_ends_with: InputMaybe<Scalars['String']['input']>;
  role_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_gt: InputMaybe<Scalars['String']['input']>;
  role_gte: InputMaybe<Scalars['String']['input']>;
  role_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_lt: InputMaybe<Scalars['String']['input']>;
  role_lte: InputMaybe<Scalars['String']['input']>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_starts_with: InputMaybe<Scalars['String']['input']>;
  role_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_starts_with: InputMaybe<Scalars['String']['input']>;
  role_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender: InputMaybe<Scalars['String']['input']>;
  sender_: InputMaybe<Account_Filter>;
  sender_contains: InputMaybe<Scalars['String']['input']>;
  sender_contains_nocase: InputMaybe<Scalars['String']['input']>;
  sender_ends_with: InputMaybe<Scalars['String']['input']>;
  sender_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender_gt: InputMaybe<Scalars['String']['input']>;
  sender_gte: InputMaybe<Scalars['String']['input']>;
  sender_in: InputMaybe<Array<Scalars['String']['input']>>;
  sender_lt: InputMaybe<Scalars['String']['input']>;
  sender_lte: InputMaybe<Scalars['String']['input']>;
  sender_not: InputMaybe<Scalars['String']['input']>;
  sender_not_contains: InputMaybe<Scalars['String']['input']>;
  sender_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_starts_with: InputMaybe<Scalars['String']['input']>;
  sender_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender_starts_with: InputMaybe<Scalars['String']['input']>;
  sender_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum RoleGranted_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Role = 'role',
  RoleId = 'role__id',
  Sender = 'sender',
  SenderId = 'sender__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type RoleRevoked = Event & {
  __typename?: 'RoleRevoked';
  account: Account;
  emitter: Account;
  id: Scalars['ID']['output'];
  role: AccessControlRole;
  sender: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type RoleRevoked_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']['input']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_ends_with: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_gt: InputMaybe<Scalars['String']['input']>;
  account_gte: InputMaybe<Scalars['String']['input']>;
  account_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt: InputMaybe<Scalars['String']['input']>;
  account_lte: InputMaybe<Scalars['String']['input']>;
  account_not: InputMaybe<Scalars['String']['input']>;
  account_not_contains: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_starts_with: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  and: InputMaybe<Array<InputMaybe<RoleRevoked_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<RoleRevoked_Filter>>>;
  role: InputMaybe<Scalars['String']['input']>;
  role_: InputMaybe<AccessControlRole_Filter>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_ends_with: InputMaybe<Scalars['String']['input']>;
  role_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_gt: InputMaybe<Scalars['String']['input']>;
  role_gte: InputMaybe<Scalars['String']['input']>;
  role_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_lt: InputMaybe<Scalars['String']['input']>;
  role_lte: InputMaybe<Scalars['String']['input']>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_starts_with: InputMaybe<Scalars['String']['input']>;
  role_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  role_starts_with: InputMaybe<Scalars['String']['input']>;
  role_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender: InputMaybe<Scalars['String']['input']>;
  sender_: InputMaybe<Account_Filter>;
  sender_contains: InputMaybe<Scalars['String']['input']>;
  sender_contains_nocase: InputMaybe<Scalars['String']['input']>;
  sender_ends_with: InputMaybe<Scalars['String']['input']>;
  sender_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender_gt: InputMaybe<Scalars['String']['input']>;
  sender_gte: InputMaybe<Scalars['String']['input']>;
  sender_in: InputMaybe<Array<Scalars['String']['input']>>;
  sender_lt: InputMaybe<Scalars['String']['input']>;
  sender_lte: InputMaybe<Scalars['String']['input']>;
  sender_not: InputMaybe<Scalars['String']['input']>;
  sender_not_contains: InputMaybe<Scalars['String']['input']>;
  sender_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_starts_with: InputMaybe<Scalars['String']['input']>;
  sender_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  sender_starts_with: InputMaybe<Scalars['String']['input']>;
  sender_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum RoleRevoked_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Role = 'role',
  RoleId = 'role__id',
  Sender = 'sender',
  SenderId = 'sender__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type Role_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Role_Filter>>>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<Role_Filter>>>;
  roleOf_: InputMaybe<AccessControlRole_Filter>;
};

export enum Role_OrderBy {
  Id = 'id',
  RoleOf = 'roleOf'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  accessControl: Maybe<AccessControl>;
  accessControlRole: Maybe<AccessControlRole>;
  accessControlRoleMember: Maybe<AccessControlRoleMember>;
  accessControlRoleMembers: Array<AccessControlRoleMember>;
  accessControlRoles: Array<AccessControlRole>;
  accessControls: Array<AccessControl>;
  account: Maybe<Account>;
  accounts: Array<Account>;
  delegate: Maybe<Delegate>;
  delegateChanged: Maybe<DelegateChanged>;
  delegateChangeds: Array<DelegateChanged>;
  delegateVotesChanged: Maybe<DelegateVotesChanged>;
  delegateVotesChangeds: Array<DelegateVotesChanged>;
  delegates: Array<Delegate>;
  event: Maybe<Event>;
  events: Array<Event>;
  governor: Maybe<Governor>;
  governors: Array<Governor>;
  lock: Maybe<Lock>;
  lockCreate: Maybe<LockCreate>;
  lockCreates: Array<LockCreate>;
  locking: Maybe<Locking>;
  lockings: Array<Locking>;
  locks: Array<Lock>;
  proposal: Maybe<Proposal>;
  proposalCall: Maybe<ProposalCall>;
  proposalCalls: Array<ProposalCall>;
  proposalCanceled: Maybe<ProposalCanceled>;
  proposalCanceleds: Array<ProposalCanceled>;
  proposalCreated: Maybe<ProposalCreated>;
  proposalCreateds: Array<ProposalCreated>;
  proposalExecuted: Maybe<ProposalExecuted>;
  proposalExecuteds: Array<ProposalExecuted>;
  proposalQueued: Maybe<ProposalQueued>;
  proposalQueueds: Array<ProposalQueued>;
  proposalSupport: Maybe<ProposalSupport>;
  proposalSupports: Array<ProposalSupport>;
  proposals: Array<Proposal>;
  relock: Maybe<Relock>;
  relocks: Array<Relock>;
  role: Maybe<Role>;
  roleAdminChanged: Maybe<RoleAdminChanged>;
  roleAdminChangeds: Array<RoleAdminChanged>;
  roleGranted: Maybe<RoleGranted>;
  roleGranteds: Array<RoleGranted>;
  roleRevoked: Maybe<RoleRevoked>;
  roleRevokeds: Array<RoleRevoked>;
  roles: Array<Role>;
  timelock: Maybe<Timelock>;
  timelockCall: Maybe<TimelockCall>;
  timelockCalls: Array<TimelockCall>;
  timelockMinDelayChange: Maybe<TimelockMinDelayChange>;
  timelockMinDelayChanges: Array<TimelockMinDelayChange>;
  timelockOperation: Maybe<TimelockOperation>;
  timelockOperationCancelled: Maybe<TimelockOperationCancelled>;
  timelockOperationCancelleds: Array<TimelockOperationCancelled>;
  timelockOperationExecuted: Maybe<TimelockOperationExecuted>;
  timelockOperationExecuteds: Array<TimelockOperationExecuted>;
  timelockOperationScheduled: Maybe<TimelockOperationScheduled>;
  timelockOperationScheduleds: Array<TimelockOperationScheduled>;
  timelockOperations: Array<TimelockOperation>;
  timelocks: Array<Timelock>;
  transaction: Maybe<Transaction>;
  transactions: Array<Transaction>;
  voteCast: Maybe<VoteCast>;
  voteCasts: Array<VoteCast>;
  voteDelegation: Maybe<VoteDelegation>;
  voteDelegations: Array<VoteDelegation>;
  voteReceipt: Maybe<VoteReceipt>;
  voteReceipts: Array<VoteReceipt>;
  voteWeight: Maybe<VoteWeight>;
  voteWeights: Array<VoteWeight>;
  votingContract: Maybe<VotingContract>;
  votingContracts: Array<VotingContract>;
  withdraw: Maybe<Withdraw>;
  withdraws: Array<Withdraw>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type SubscriptionAccessControlArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccessControlRoleArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccessControlRoleMemberArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccessControlRoleMembersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRoleMember_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AccessControlRoleMember_Filter>;
};


export type SubscriptionAccessControlRolesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControlRole_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AccessControlRole_Filter>;
};


export type SubscriptionAccessControlsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<AccessControl_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AccessControl_Filter>;
};


export type SubscriptionAccountArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Account_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Account_Filter>;
};


export type SubscriptionDelegateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDelegateChangedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDelegateChangedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DelegateChanged_Filter>;
};


export type SubscriptionDelegateVotesChangedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDelegateVotesChangedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateVotesChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<DelegateVotesChanged_Filter>;
};


export type SubscriptionDelegatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Delegate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Delegate_Filter>;
};


export type SubscriptionEventArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEventsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Event_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Event_Filter>;
};


export type SubscriptionGovernorArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGovernorsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Governor_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Governor_Filter>;
};


export type SubscriptionLockArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLockCreateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLockCreatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<LockCreate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LockCreate_Filter>;
};


export type SubscriptionLockingArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLockingsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Locking_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Locking_Filter>;
};


export type SubscriptionLocksArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Lock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Lock_Filter>;
};


export type SubscriptionProposalArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalCallArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalCallsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalCall_Filter>;
};


export type SubscriptionProposalCanceledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalCanceledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCanceled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalCanceled_Filter>;
};


export type SubscriptionProposalCreatedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalCreatedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalCreated_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalCreated_Filter>;
};


export type SubscriptionProposalExecutedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalExecutedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalExecuted_Filter>;
};


export type SubscriptionProposalQueuedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalQueuedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalQueued_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalQueued_Filter>;
};


export type SubscriptionProposalSupportArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalSupportsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<ProposalSupport_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProposalSupport_Filter>;
};


export type SubscriptionProposalsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Proposal_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Proposal_Filter>;
};


export type SubscriptionRelockArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRelocksArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Relock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Relock_Filter>;
};


export type SubscriptionRoleArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoleAdminChangedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoleAdminChangedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleAdminChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RoleAdminChanged_Filter>;
};


export type SubscriptionRoleGrantedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoleGrantedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleGranted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RoleGranted_Filter>;
};


export type SubscriptionRoleRevokedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoleRevokedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<RoleRevoked_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<RoleRevoked_Filter>;
};


export type SubscriptionRolesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Role_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Role_Filter>;
};


export type SubscriptionTimelockArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockCallArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockCallsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockCall_Filter>;
};


export type SubscriptionTimelockMinDelayChangeArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockMinDelayChangesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockMinDelayChange_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockMinDelayChange_Filter>;
};


export type SubscriptionTimelockOperationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockOperationCancelledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockOperationCancelledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationCancelled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperationCancelled_Filter>;
};


export type SubscriptionTimelockOperationExecutedArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockOperationExecutedsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperationExecuted_Filter>;
};


export type SubscriptionTimelockOperationScheduledArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTimelockOperationScheduledsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationScheduled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperationScheduled_Filter>;
};


export type SubscriptionTimelockOperationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TimelockOperation_Filter>;
};


export type SubscriptionTimelocksArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Timelock_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Timelock_Filter>;
};


export type SubscriptionTransactionArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Transaction_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transaction_Filter>;
};


export type SubscriptionVoteCastArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVoteCastsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteCast_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteCast_Filter>;
};


export type SubscriptionVoteDelegationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVoteDelegationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteDelegation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteDelegation_Filter>;
};


export type SubscriptionVoteReceiptArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVoteReceiptsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteReceipt_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteReceipt_Filter>;
};


export type SubscriptionVoteWeightArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVoteWeightsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteWeight_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VoteWeight_Filter>;
};


export type SubscriptionVotingContractArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVotingContractsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VotingContract_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<VotingContract_Filter>;
};


export type SubscriptionWithdrawArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Withdraw_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Withdraw_Filter>;
};

export type Timelock = {
  __typename?: 'Timelock';
  asAccount: Account;
  cancelled: Array<TimelockOperationCancelled>;
  executed: Array<TimelockOperationExecuted>;
  id: Scalars['Bytes']['output'];
  mindelaychange: Array<TimelockMinDelayChange>;
  operations: Array<TimelockOperation>;
  scheduled: Array<TimelockOperationScheduled>;
};


export type TimelockCancelledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationCancelled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationCancelled_Filter>;
};


export type TimelockExecutedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationExecuted_Filter>;
};


export type TimelockMindelaychangeArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockMinDelayChange_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockMinDelayChange_Filter>;
};


export type TimelockOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperation_Filter>;
};


export type TimelockScheduledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationScheduled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationScheduled_Filter>;
};

export type TimelockCall = {
  __typename?: 'TimelockCall';
  data: Scalars['Bytes']['output'];
  executed: Array<TimelockOperationExecuted>;
  id: Scalars['ID']['output'];
  index: Scalars['BigInt']['output'];
  operation: TimelockOperation;
  scheduled: Array<TimelockOperationScheduled>;
  target: Account;
  value: Scalars['BigDecimal']['output'];
};


export type TimelockCallExecutedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationExecuted_Filter>;
};


export type TimelockCallScheduledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationScheduled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationScheduled_Filter>;
};

export type TimelockCall_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TimelockCall_Filter>>>;
  data: InputMaybe<Scalars['Bytes']['input']>;
  data_contains: InputMaybe<Scalars['Bytes']['input']>;
  data_gt: InputMaybe<Scalars['Bytes']['input']>;
  data_gte: InputMaybe<Scalars['Bytes']['input']>;
  data_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_lt: InputMaybe<Scalars['Bytes']['input']>;
  data_lte: InputMaybe<Scalars['Bytes']['input']>;
  data_not: InputMaybe<Scalars['Bytes']['input']>;
  data_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  data_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  executed_: InputMaybe<TimelockOperationExecuted_Filter>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  index: InputMaybe<Scalars['BigInt']['input']>;
  index_gt: InputMaybe<Scalars['BigInt']['input']>;
  index_gte: InputMaybe<Scalars['BigInt']['input']>;
  index_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  index_lt: InputMaybe<Scalars['BigInt']['input']>;
  index_lte: InputMaybe<Scalars['BigInt']['input']>;
  index_not: InputMaybe<Scalars['BigInt']['input']>;
  index_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operation: InputMaybe<Scalars['String']['input']>;
  operation_: InputMaybe<TimelockOperation_Filter>;
  operation_contains: InputMaybe<Scalars['String']['input']>;
  operation_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_gt: InputMaybe<Scalars['String']['input']>;
  operation_gte: InputMaybe<Scalars['String']['input']>;
  operation_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_lt: InputMaybe<Scalars['String']['input']>;
  operation_lte: InputMaybe<Scalars['String']['input']>;
  operation_not: InputMaybe<Scalars['String']['input']>;
  operation_not_contains: InputMaybe<Scalars['String']['input']>;
  operation_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_not_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<TimelockCall_Filter>>>;
  scheduled_: InputMaybe<TimelockOperationScheduled_Filter>;
  target: InputMaybe<Scalars['String']['input']>;
  target_: InputMaybe<Account_Filter>;
  target_contains: InputMaybe<Scalars['String']['input']>;
  target_contains_nocase: InputMaybe<Scalars['String']['input']>;
  target_ends_with: InputMaybe<Scalars['String']['input']>;
  target_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  target_gt: InputMaybe<Scalars['String']['input']>;
  target_gte: InputMaybe<Scalars['String']['input']>;
  target_in: InputMaybe<Array<Scalars['String']['input']>>;
  target_lt: InputMaybe<Scalars['String']['input']>;
  target_lte: InputMaybe<Scalars['String']['input']>;
  target_not: InputMaybe<Scalars['String']['input']>;
  target_not_contains: InputMaybe<Scalars['String']['input']>;
  target_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  target_not_ends_with: InputMaybe<Scalars['String']['input']>;
  target_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  target_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  target_not_starts_with: InputMaybe<Scalars['String']['input']>;
  target_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  target_starts_with: InputMaybe<Scalars['String']['input']>;
  target_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  value: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gt: InputMaybe<Scalars['BigDecimal']['input']>;
  value_gte: InputMaybe<Scalars['BigDecimal']['input']>;
  value_in: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  value_lt: InputMaybe<Scalars['BigDecimal']['input']>;
  value_lte: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not: InputMaybe<Scalars['BigDecimal']['input']>;
  value_not_in: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum TimelockCall_OrderBy {
  Data = 'data',
  Executed = 'executed',
  Id = 'id',
  Index = 'index',
  Operation = 'operation',
  OperationDelay = 'operation__delay',
  OperationId = 'operation__id',
  OperationStatus = 'operation__status',
  OperationTimestamp = 'operation__timestamp',
  Scheduled = 'scheduled',
  Target = 'target',
  TargetId = 'target__id',
  Value = 'value'
}

export type TimelockMinDelayChange = Event & {
  __typename?: 'TimelockMinDelayChange';
  contract: Timelock;
  delay: Scalars['BigInt']['output'];
  emitter: Account;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type TimelockMinDelayChange_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TimelockMinDelayChange_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<Timelock_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delay: InputMaybe<Scalars['BigInt']['input']>;
  delay_gt: InputMaybe<Scalars['BigInt']['input']>;
  delay_gte: InputMaybe<Scalars['BigInt']['input']>;
  delay_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delay_lt: InputMaybe<Scalars['BigInt']['input']>;
  delay_lte: InputMaybe<Scalars['BigInt']['input']>;
  delay_not: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<TimelockMinDelayChange_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum TimelockMinDelayChange_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  Delay = 'delay',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type TimelockOperation = {
  __typename?: 'TimelockOperation';
  calls: Array<TimelockCall>;
  cancelled: Array<TimelockOperationCancelled>;
  contract: Timelock;
  delay: Scalars['BigInt']['output'];
  executed: Array<TimelockOperationExecuted>;
  id: Scalars['ID']['output'];
  predecessor: Maybe<TimelockOperation>;
  scheduled: Array<TimelockOperationScheduled>;
  status: TimelockStatus;
  timestamp: Scalars['BigInt']['output'];
};


export type TimelockOperationCallsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockCall_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockCall_Filter>;
};


export type TimelockOperationCancelledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationCancelled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationCancelled_Filter>;
};


export type TimelockOperationExecutedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationExecuted_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationExecuted_Filter>;
};


export type TimelockOperationScheduledArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<TimelockOperationScheduled_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<TimelockOperationScheduled_Filter>;
};

export type TimelockOperationCancelled = Event & {
  __typename?: 'TimelockOperationCancelled';
  contract: Timelock;
  emitter: Account;
  id: Scalars['ID']['output'];
  operation: TimelockOperation;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type TimelockOperationCancelled_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TimelockOperationCancelled_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<Timelock_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  operation: InputMaybe<Scalars['String']['input']>;
  operation_: InputMaybe<TimelockOperation_Filter>;
  operation_contains: InputMaybe<Scalars['String']['input']>;
  operation_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_gt: InputMaybe<Scalars['String']['input']>;
  operation_gte: InputMaybe<Scalars['String']['input']>;
  operation_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_lt: InputMaybe<Scalars['String']['input']>;
  operation_lte: InputMaybe<Scalars['String']['input']>;
  operation_not: InputMaybe<Scalars['String']['input']>;
  operation_not_contains: InputMaybe<Scalars['String']['input']>;
  operation_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_not_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<TimelockOperationCancelled_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum TimelockOperationCancelled_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Operation = 'operation',
  OperationDelay = 'operation__delay',
  OperationId = 'operation__id',
  OperationStatus = 'operation__status',
  OperationTimestamp = 'operation__timestamp',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type TimelockOperationExecuted = Event & {
  __typename?: 'TimelockOperationExecuted';
  call: TimelockCall;
  contract: Timelock;
  emitter: Account;
  id: Scalars['ID']['output'];
  operation: TimelockOperation;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type TimelockOperationExecuted_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TimelockOperationExecuted_Filter>>>;
  call: InputMaybe<Scalars['String']['input']>;
  call_: InputMaybe<TimelockCall_Filter>;
  call_contains: InputMaybe<Scalars['String']['input']>;
  call_contains_nocase: InputMaybe<Scalars['String']['input']>;
  call_ends_with: InputMaybe<Scalars['String']['input']>;
  call_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  call_gt: InputMaybe<Scalars['String']['input']>;
  call_gte: InputMaybe<Scalars['String']['input']>;
  call_in: InputMaybe<Array<Scalars['String']['input']>>;
  call_lt: InputMaybe<Scalars['String']['input']>;
  call_lte: InputMaybe<Scalars['String']['input']>;
  call_not: InputMaybe<Scalars['String']['input']>;
  call_not_contains: InputMaybe<Scalars['String']['input']>;
  call_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  call_not_ends_with: InputMaybe<Scalars['String']['input']>;
  call_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  call_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  call_not_starts_with: InputMaybe<Scalars['String']['input']>;
  call_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  call_starts_with: InputMaybe<Scalars['String']['input']>;
  call_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<Timelock_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  operation: InputMaybe<Scalars['String']['input']>;
  operation_: InputMaybe<TimelockOperation_Filter>;
  operation_contains: InputMaybe<Scalars['String']['input']>;
  operation_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_gt: InputMaybe<Scalars['String']['input']>;
  operation_gte: InputMaybe<Scalars['String']['input']>;
  operation_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_lt: InputMaybe<Scalars['String']['input']>;
  operation_lte: InputMaybe<Scalars['String']['input']>;
  operation_not: InputMaybe<Scalars['String']['input']>;
  operation_not_contains: InputMaybe<Scalars['String']['input']>;
  operation_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_not_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<TimelockOperationExecuted_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum TimelockOperationExecuted_OrderBy {
  Call = 'call',
  CallData = 'call__data',
  CallId = 'call__id',
  CallIndex = 'call__index',
  CallValue = 'call__value',
  Contract = 'contract',
  ContractId = 'contract__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Operation = 'operation',
  OperationDelay = 'operation__delay',
  OperationId = 'operation__id',
  OperationStatus = 'operation__status',
  OperationTimestamp = 'operation__timestamp',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type TimelockOperationScheduled = Event & {
  __typename?: 'TimelockOperationScheduled';
  call: TimelockCall;
  contract: Timelock;
  emitter: Account;
  id: Scalars['ID']['output'];
  operation: TimelockOperation;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type TimelockOperationScheduled_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TimelockOperationScheduled_Filter>>>;
  call: InputMaybe<Scalars['String']['input']>;
  call_: InputMaybe<TimelockCall_Filter>;
  call_contains: InputMaybe<Scalars['String']['input']>;
  call_contains_nocase: InputMaybe<Scalars['String']['input']>;
  call_ends_with: InputMaybe<Scalars['String']['input']>;
  call_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  call_gt: InputMaybe<Scalars['String']['input']>;
  call_gte: InputMaybe<Scalars['String']['input']>;
  call_in: InputMaybe<Array<Scalars['String']['input']>>;
  call_lt: InputMaybe<Scalars['String']['input']>;
  call_lte: InputMaybe<Scalars['String']['input']>;
  call_not: InputMaybe<Scalars['String']['input']>;
  call_not_contains: InputMaybe<Scalars['String']['input']>;
  call_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  call_not_ends_with: InputMaybe<Scalars['String']['input']>;
  call_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  call_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  call_not_starts_with: InputMaybe<Scalars['String']['input']>;
  call_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  call_starts_with: InputMaybe<Scalars['String']['input']>;
  call_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<Timelock_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  operation: InputMaybe<Scalars['String']['input']>;
  operation_: InputMaybe<TimelockOperation_Filter>;
  operation_contains: InputMaybe<Scalars['String']['input']>;
  operation_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_gt: InputMaybe<Scalars['String']['input']>;
  operation_gte: InputMaybe<Scalars['String']['input']>;
  operation_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_lt: InputMaybe<Scalars['String']['input']>;
  operation_lte: InputMaybe<Scalars['String']['input']>;
  operation_not: InputMaybe<Scalars['String']['input']>;
  operation_not_contains: InputMaybe<Scalars['String']['input']>;
  operation_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with: InputMaybe<Scalars['String']['input']>;
  operation_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  operation_not_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  operation_starts_with: InputMaybe<Scalars['String']['input']>;
  operation_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<TimelockOperationScheduled_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum TimelockOperationScheduled_OrderBy {
  Call = 'call',
  CallData = 'call__data',
  CallId = 'call__id',
  CallIndex = 'call__index',
  CallValue = 'call__value',
  Contract = 'contract',
  ContractId = 'contract__id',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Operation = 'operation',
  OperationDelay = 'operation__delay',
  OperationId = 'operation__id',
  OperationStatus = 'operation__status',
  OperationTimestamp = 'operation__timestamp',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type TimelockOperation_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TimelockOperation_Filter>>>;
  calls_: InputMaybe<TimelockCall_Filter>;
  cancelled_: InputMaybe<TimelockOperationCancelled_Filter>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<Timelock_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delay: InputMaybe<Scalars['BigInt']['input']>;
  delay_gt: InputMaybe<Scalars['BigInt']['input']>;
  delay_gte: InputMaybe<Scalars['BigInt']['input']>;
  delay_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delay_lt: InputMaybe<Scalars['BigInt']['input']>;
  delay_lte: InputMaybe<Scalars['BigInt']['input']>;
  delay_not: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executed_: InputMaybe<TimelockOperationExecuted_Filter>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<TimelockOperation_Filter>>>;
  predecessor: InputMaybe<Scalars['String']['input']>;
  predecessor_: InputMaybe<TimelockOperation_Filter>;
  predecessor_contains: InputMaybe<Scalars['String']['input']>;
  predecessor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  predecessor_ends_with: InputMaybe<Scalars['String']['input']>;
  predecessor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  predecessor_gt: InputMaybe<Scalars['String']['input']>;
  predecessor_gte: InputMaybe<Scalars['String']['input']>;
  predecessor_in: InputMaybe<Array<Scalars['String']['input']>>;
  predecessor_lt: InputMaybe<Scalars['String']['input']>;
  predecessor_lte: InputMaybe<Scalars['String']['input']>;
  predecessor_not: InputMaybe<Scalars['String']['input']>;
  predecessor_not_contains: InputMaybe<Scalars['String']['input']>;
  predecessor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  predecessor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  predecessor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  predecessor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  predecessor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  predecessor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  predecessor_starts_with: InputMaybe<Scalars['String']['input']>;
  predecessor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  scheduled_: InputMaybe<TimelockOperationScheduled_Filter>;
  status: InputMaybe<TimelockStatus>;
  status_in: InputMaybe<Array<TimelockStatus>>;
  status_not: InputMaybe<TimelockStatus>;
  status_not_in: InputMaybe<Array<TimelockStatus>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum TimelockOperation_OrderBy {
  Calls = 'calls',
  Cancelled = 'cancelled',
  Contract = 'contract',
  ContractId = 'contract__id',
  Delay = 'delay',
  Executed = 'executed',
  Id = 'id',
  Predecessor = 'predecessor',
  PredecessorDelay = 'predecessor__delay',
  PredecessorId = 'predecessor__id',
  PredecessorStatus = 'predecessor__status',
  PredecessorTimestamp = 'predecessor__timestamp',
  Scheduled = 'scheduled',
  Status = 'status',
  Timestamp = 'timestamp'
}

export enum TimelockStatus {
  Canceled = 'CANCELED',
  Executed = 'EXECUTED',
  Scheduled = 'SCHEDULED'
}

export type Timelock_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Timelock_Filter>>>;
  asAccount: InputMaybe<Scalars['String']['input']>;
  asAccount_: InputMaybe<Account_Filter>;
  asAccount_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_gt: InputMaybe<Scalars['String']['input']>;
  asAccount_gte: InputMaybe<Scalars['String']['input']>;
  asAccount_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt: InputMaybe<Scalars['String']['input']>;
  asAccount_lte: InputMaybe<Scalars['String']['input']>;
  asAccount_not: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  cancelled_: InputMaybe<TimelockOperationCancelled_Filter>;
  executed_: InputMaybe<TimelockOperationExecuted_Filter>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  mindelaychange_: InputMaybe<TimelockMinDelayChange_Filter>;
  operations_: InputMaybe<TimelockOperation_Filter>;
  or: InputMaybe<Array<InputMaybe<Timelock_Filter>>>;
  scheduled_: InputMaybe<TimelockOperationScheduled_Filter>;
};

export enum Timelock_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  Cancelled = 'cancelled',
  Executed = 'executed',
  Id = 'id',
  Mindelaychange = 'mindelaychange',
  Operations = 'operations',
  Scheduled = 'scheduled'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt']['output'];
  events: Array<Event>;
  id: Scalars['ID']['output'];
  timestamp: Scalars['BigInt']['output'];
};


export type TransactionEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Event_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<Event_Filter>;
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockNumber: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  events_: InputMaybe<Event_Filter>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Events = 'events',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type VoteCast = Event & {
  __typename?: 'VoteCast';
  emitter: Account;
  governor: Governor;
  id: Scalars['ID']['output'];
  proposal: Proposal;
  receipt: VoteReceipt;
  support: ProposalSupport;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
  voter: Account;
};

export type VoteCast_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<VoteCast_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor: InputMaybe<Scalars['String']['input']>;
  governor_: InputMaybe<Governor_Filter>;
  governor_contains: InputMaybe<Scalars['String']['input']>;
  governor_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_gt: InputMaybe<Scalars['String']['input']>;
  governor_gte: InputMaybe<Scalars['String']['input']>;
  governor_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_lt: InputMaybe<Scalars['String']['input']>;
  governor_lte: InputMaybe<Scalars['String']['input']>;
  governor_not: InputMaybe<Scalars['String']['input']>;
  governor_not_contains: InputMaybe<Scalars['String']['input']>;
  governor_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with: InputMaybe<Scalars['String']['input']>;
  governor_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  governor_not_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  governor_starts_with: InputMaybe<Scalars['String']['input']>;
  governor_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<VoteCast_Filter>>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  receipt: InputMaybe<Scalars['String']['input']>;
  receipt_: InputMaybe<VoteReceipt_Filter>;
  receipt_contains: InputMaybe<Scalars['String']['input']>;
  receipt_contains_nocase: InputMaybe<Scalars['String']['input']>;
  receipt_ends_with: InputMaybe<Scalars['String']['input']>;
  receipt_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  receipt_gt: InputMaybe<Scalars['String']['input']>;
  receipt_gte: InputMaybe<Scalars['String']['input']>;
  receipt_in: InputMaybe<Array<Scalars['String']['input']>>;
  receipt_lt: InputMaybe<Scalars['String']['input']>;
  receipt_lte: InputMaybe<Scalars['String']['input']>;
  receipt_not: InputMaybe<Scalars['String']['input']>;
  receipt_not_contains: InputMaybe<Scalars['String']['input']>;
  receipt_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  receipt_not_ends_with: InputMaybe<Scalars['String']['input']>;
  receipt_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  receipt_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  receipt_not_starts_with: InputMaybe<Scalars['String']['input']>;
  receipt_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  receipt_starts_with: InputMaybe<Scalars['String']['input']>;
  receipt_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  support: InputMaybe<Scalars['String']['input']>;
  support_: InputMaybe<ProposalSupport_Filter>;
  support_contains: InputMaybe<Scalars['String']['input']>;
  support_contains_nocase: InputMaybe<Scalars['String']['input']>;
  support_ends_with: InputMaybe<Scalars['String']['input']>;
  support_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  support_gt: InputMaybe<Scalars['String']['input']>;
  support_gte: InputMaybe<Scalars['String']['input']>;
  support_in: InputMaybe<Array<Scalars['String']['input']>>;
  support_lt: InputMaybe<Scalars['String']['input']>;
  support_lte: InputMaybe<Scalars['String']['input']>;
  support_not: InputMaybe<Scalars['String']['input']>;
  support_not_contains: InputMaybe<Scalars['String']['input']>;
  support_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  support_not_ends_with: InputMaybe<Scalars['String']['input']>;
  support_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  support_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  support_not_starts_with: InputMaybe<Scalars['String']['input']>;
  support_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  support_starts_with: InputMaybe<Scalars['String']['input']>;
  support_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter: InputMaybe<Scalars['String']['input']>;
  voter_: InputMaybe<Account_Filter>;
  voter_contains: InputMaybe<Scalars['String']['input']>;
  voter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  voter_ends_with: InputMaybe<Scalars['String']['input']>;
  voter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter_gt: InputMaybe<Scalars['String']['input']>;
  voter_gte: InputMaybe<Scalars['String']['input']>;
  voter_in: InputMaybe<Array<Scalars['String']['input']>>;
  voter_lt: InputMaybe<Scalars['String']['input']>;
  voter_lte: InputMaybe<Scalars['String']['input']>;
  voter_not: InputMaybe<Scalars['String']['input']>;
  voter_not_contains: InputMaybe<Scalars['String']['input']>;
  voter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  voter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  voter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter_starts_with: InputMaybe<Scalars['String']['input']>;
  voter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum VoteCast_OrderBy {
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Governor = 'governor',
  GovernorId = 'governor__id',
  GovernorMode = 'governor__mode',
  Id = 'id',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Receipt = 'receipt',
  ReceiptId = 'receipt__id',
  ReceiptParams = 'receipt__params',
  ReceiptReason = 'receipt__reason',
  ReceiptWeight = 'receipt__weight',
  Support = 'support',
  SupportId = 'support__id',
  SupportSupport = 'support__support',
  SupportWeight = 'support__weight',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp',
  Voter = 'voter',
  VoterId = 'voter__id'
}

export type VoteDelegation = {
  __typename?: 'VoteDelegation';
  contract: VotingContract;
  delegateChangedEvent: Array<DelegateChanged>;
  delegatee: Account;
  delegator: Account;
  id: Scalars['ID']['output'];
};


export type VoteDelegationDelegateChangedEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateChanged_Filter>;
};

export type VoteDelegation_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<VoteDelegation_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<VotingContract_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegateChangedEvent_: InputMaybe<DelegateChanged_Filter>;
  delegatee: InputMaybe<Scalars['String']['input']>;
  delegatee_: InputMaybe<Account_Filter>;
  delegatee_contains: InputMaybe<Scalars['String']['input']>;
  delegatee_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegatee_ends_with: InputMaybe<Scalars['String']['input']>;
  delegatee_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegatee_gt: InputMaybe<Scalars['String']['input']>;
  delegatee_gte: InputMaybe<Scalars['String']['input']>;
  delegatee_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegatee_lt: InputMaybe<Scalars['String']['input']>;
  delegatee_lte: InputMaybe<Scalars['String']['input']>;
  delegatee_not: InputMaybe<Scalars['String']['input']>;
  delegatee_not_contains: InputMaybe<Scalars['String']['input']>;
  delegatee_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegatee_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegatee_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegatee_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegatee_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegatee_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegatee_starts_with: InputMaybe<Scalars['String']['input']>;
  delegatee_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator: InputMaybe<Scalars['String']['input']>;
  delegator_: InputMaybe<Account_Filter>;
  delegator_contains: InputMaybe<Scalars['String']['input']>;
  delegator_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with: InputMaybe<Scalars['String']['input']>;
  delegator_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_gt: InputMaybe<Scalars['String']['input']>;
  delegator_gte: InputMaybe<Scalars['String']['input']>;
  delegator_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_lt: InputMaybe<Scalars['String']['input']>;
  delegator_lte: InputMaybe<Scalars['String']['input']>;
  delegator_not: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with: InputMaybe<Scalars['String']['input']>;
  delegator_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_not_starts_with: InputMaybe<Scalars['String']['input']>;
  delegator_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with: InputMaybe<Scalars['String']['input']>;
  delegator_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<VoteDelegation_Filter>>>;
};

export enum VoteDelegation_OrderBy {
  Contract = 'contract',
  ContractId = 'contract__id',
  DelegateChangedEvent = 'delegateChangedEvent',
  Delegatee = 'delegatee',
  DelegateeId = 'delegatee__id',
  Delegator = 'delegator',
  DelegatorId = 'delegator__id',
  Id = 'id'
}

export type VoteReceipt = {
  __typename?: 'VoteReceipt';
  id: Scalars['ID']['output'];
  params: Maybe<Scalars['Bytes']['output']>;
  proposal: Proposal;
  reason: Scalars['String']['output'];
  support: ProposalSupport;
  voter: Account;
  weight: Scalars['BigInt']['output'];
};

export type VoteReceipt_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<VoteReceipt_Filter>>>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<VoteReceipt_Filter>>>;
  params: InputMaybe<Scalars['Bytes']['input']>;
  params_contains: InputMaybe<Scalars['Bytes']['input']>;
  params_gt: InputMaybe<Scalars['Bytes']['input']>;
  params_gte: InputMaybe<Scalars['Bytes']['input']>;
  params_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  params_lt: InputMaybe<Scalars['Bytes']['input']>;
  params_lte: InputMaybe<Scalars['Bytes']['input']>;
  params_not: InputMaybe<Scalars['Bytes']['input']>;
  params_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  params_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposal: InputMaybe<Scalars['String']['input']>;
  proposal_: InputMaybe<Proposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_gt: InputMaybe<Scalars['String']['input']>;
  proposal_gte: InputMaybe<Scalars['String']['input']>;
  proposal_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt: InputMaybe<Scalars['String']['input']>;
  proposal_lte: InputMaybe<Scalars['String']['input']>;
  proposal_not: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  reason: InputMaybe<Scalars['String']['input']>;
  reason_contains: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase: InputMaybe<Scalars['String']['input']>;
  reason_ends_with: InputMaybe<Scalars['String']['input']>;
  reason_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  reason_gt: InputMaybe<Scalars['String']['input']>;
  reason_gte: InputMaybe<Scalars['String']['input']>;
  reason_in: InputMaybe<Array<Scalars['String']['input']>>;
  reason_lt: InputMaybe<Scalars['String']['input']>;
  reason_lte: InputMaybe<Scalars['String']['input']>;
  reason_not: InputMaybe<Scalars['String']['input']>;
  reason_not_contains: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  reason_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  reason_not_starts_with: InputMaybe<Scalars['String']['input']>;
  reason_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  reason_starts_with: InputMaybe<Scalars['String']['input']>;
  reason_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  support: InputMaybe<Scalars['String']['input']>;
  support_: InputMaybe<ProposalSupport_Filter>;
  support_contains: InputMaybe<Scalars['String']['input']>;
  support_contains_nocase: InputMaybe<Scalars['String']['input']>;
  support_ends_with: InputMaybe<Scalars['String']['input']>;
  support_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  support_gt: InputMaybe<Scalars['String']['input']>;
  support_gte: InputMaybe<Scalars['String']['input']>;
  support_in: InputMaybe<Array<Scalars['String']['input']>>;
  support_lt: InputMaybe<Scalars['String']['input']>;
  support_lte: InputMaybe<Scalars['String']['input']>;
  support_not: InputMaybe<Scalars['String']['input']>;
  support_not_contains: InputMaybe<Scalars['String']['input']>;
  support_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  support_not_ends_with: InputMaybe<Scalars['String']['input']>;
  support_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  support_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  support_not_starts_with: InputMaybe<Scalars['String']['input']>;
  support_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  support_starts_with: InputMaybe<Scalars['String']['input']>;
  support_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter: InputMaybe<Scalars['String']['input']>;
  voter_: InputMaybe<Account_Filter>;
  voter_contains: InputMaybe<Scalars['String']['input']>;
  voter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  voter_ends_with: InputMaybe<Scalars['String']['input']>;
  voter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter_gt: InputMaybe<Scalars['String']['input']>;
  voter_gte: InputMaybe<Scalars['String']['input']>;
  voter_in: InputMaybe<Array<Scalars['String']['input']>>;
  voter_lt: InputMaybe<Scalars['String']['input']>;
  voter_lte: InputMaybe<Scalars['String']['input']>;
  voter_not: InputMaybe<Scalars['String']['input']>;
  voter_not_contains: InputMaybe<Scalars['String']['input']>;
  voter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  voter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  voter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  voter_starts_with: InputMaybe<Scalars['String']['input']>;
  voter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  weight: InputMaybe<Scalars['BigInt']['input']>;
  weight_gt: InputMaybe<Scalars['BigInt']['input']>;
  weight_gte: InputMaybe<Scalars['BigInt']['input']>;
  weight_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weight_lt: InputMaybe<Scalars['BigInt']['input']>;
  weight_lte: InputMaybe<Scalars['BigInt']['input']>;
  weight_not: InputMaybe<Scalars['BigInt']['input']>;
  weight_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum VoteReceipt_OrderBy {
  Id = 'id',
  Params = 'params',
  Proposal = 'proposal',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalEndBlock = 'proposal__endBlock',
  ProposalEta = 'proposal__eta',
  ProposalExecuted = 'proposal__executed',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalQueued = 'proposal__queued',
  ProposalStartBlock = 'proposal__startBlock',
  Reason = 'reason',
  Support = 'support',
  SupportId = 'support__id',
  SupportSupport = 'support__support',
  SupportWeight = 'support__weight',
  Voter = 'voter',
  VoterId = 'voter__id',
  Weight = 'weight'
}

export type VoteType = {
  __typename?: 'VoteType';
  participants: Array<Participant>;
  total: Scalars['BigInt']['output'];
};

export type VoteWeight = {
  __typename?: 'VoteWeight';
  account: Maybe<Account>;
  contract: VotingContract;
  delegateVotesChangedEvent: Array<DelegateVotesChanged>;
  id: Scalars['ID']['output'];
  value: Scalars['BigInt']['output'];
};


export type VoteWeightDelegateVotesChangedEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateVotesChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateVotesChanged_Filter>;
};

export type VoteWeight_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  account: InputMaybe<Scalars['String']['input']>;
  account_: InputMaybe<Account_Filter>;
  account_contains: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_ends_with: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_gt: InputMaybe<Scalars['String']['input']>;
  account_gte: InputMaybe<Scalars['String']['input']>;
  account_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt: InputMaybe<Scalars['String']['input']>;
  account_lte: InputMaybe<Scalars['String']['input']>;
  account_not: InputMaybe<Scalars['String']['input']>;
  account_not_contains: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  account_starts_with: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  and: InputMaybe<Array<InputMaybe<VoteWeight_Filter>>>;
  contract: InputMaybe<Scalars['String']['input']>;
  contract_: InputMaybe<VotingContract_Filter>;
  contract_contains: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_gt: InputMaybe<Scalars['String']['input']>;
  contract_gte: InputMaybe<Scalars['String']['input']>;
  contract_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt: InputMaybe<Scalars['String']['input']>;
  contract_lte: InputMaybe<Scalars['String']['input']>;
  contract_not: InputMaybe<Scalars['String']['input']>;
  contract_not_contains: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  contract_starts_with: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegateVotesChangedEvent_: InputMaybe<DelegateVotesChanged_Filter>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  or: InputMaybe<Array<InputMaybe<VoteWeight_Filter>>>;
  value: InputMaybe<Scalars['BigInt']['input']>;
  value_gt: InputMaybe<Scalars['BigInt']['input']>;
  value_gte: InputMaybe<Scalars['BigInt']['input']>;
  value_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt: InputMaybe<Scalars['BigInt']['input']>;
  value_lte: InputMaybe<Scalars['BigInt']['input']>;
  value_not: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum VoteWeight_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Contract = 'contract',
  ContractId = 'contract__id',
  DelegateVotesChangedEvent = 'delegateVotesChangedEvent',
  Id = 'id',
  Value = 'value'
}

export type VotingContract = {
  __typename?: 'VotingContract';
  asAccount: Account;
  delegateChangedEvent: Array<DelegateChanged>;
  delegateVotesChangedEvent: Array<DelegateVotesChanged>;
  delegation: Array<VoteDelegation>;
  id: Scalars['Bytes']['output'];
  totalWeight: VoteWeight;
  weight: Array<VoteWeight>;
};


export type VotingContractDelegateChangedEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateChanged_Filter>;
};


export type VotingContractDelegateVotesChangedEventArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<DelegateVotesChanged_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<DelegateVotesChanged_Filter>;
};


export type VotingContractDelegationArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteDelegation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteDelegation_Filter>;
};


export type VotingContractWeightArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<VoteWeight_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where: InputMaybe<VoteWeight_Filter>;
};

export type VotingContract_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<VotingContract_Filter>>>;
  asAccount: InputMaybe<Scalars['String']['input']>;
  asAccount_: InputMaybe<Account_Filter>;
  asAccount_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_gt: InputMaybe<Scalars['String']['input']>;
  asAccount_gte: InputMaybe<Scalars['String']['input']>;
  asAccount_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_lt: InputMaybe<Scalars['String']['input']>;
  asAccount_lte: InputMaybe<Scalars['String']['input']>;
  asAccount_not: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains: InputMaybe<Scalars['String']['input']>;
  asAccount_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  asAccount_not_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with: InputMaybe<Scalars['String']['input']>;
  asAccount_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  delegateChangedEvent_: InputMaybe<DelegateChanged_Filter>;
  delegateVotesChangedEvent_: InputMaybe<DelegateVotesChanged_Filter>;
  delegation_: InputMaybe<VoteDelegation_Filter>;
  id: InputMaybe<Scalars['Bytes']['input']>;
  id_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_gt: InputMaybe<Scalars['Bytes']['input']>;
  id_gte: InputMaybe<Scalars['Bytes']['input']>;
  id_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt: InputMaybe<Scalars['Bytes']['input']>;
  id_lte: InputMaybe<Scalars['Bytes']['input']>;
  id_not: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or: InputMaybe<Array<InputMaybe<VotingContract_Filter>>>;
  totalWeight: InputMaybe<Scalars['String']['input']>;
  totalWeight_: InputMaybe<VoteWeight_Filter>;
  totalWeight_contains: InputMaybe<Scalars['String']['input']>;
  totalWeight_contains_nocase: InputMaybe<Scalars['String']['input']>;
  totalWeight_ends_with: InputMaybe<Scalars['String']['input']>;
  totalWeight_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  totalWeight_gt: InputMaybe<Scalars['String']['input']>;
  totalWeight_gte: InputMaybe<Scalars['String']['input']>;
  totalWeight_in: InputMaybe<Array<Scalars['String']['input']>>;
  totalWeight_lt: InputMaybe<Scalars['String']['input']>;
  totalWeight_lte: InputMaybe<Scalars['String']['input']>;
  totalWeight_not: InputMaybe<Scalars['String']['input']>;
  totalWeight_not_contains: InputMaybe<Scalars['String']['input']>;
  totalWeight_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  totalWeight_not_ends_with: InputMaybe<Scalars['String']['input']>;
  totalWeight_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  totalWeight_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  totalWeight_not_starts_with: InputMaybe<Scalars['String']['input']>;
  totalWeight_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  totalWeight_starts_with: InputMaybe<Scalars['String']['input']>;
  totalWeight_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  weight_: InputMaybe<VoteWeight_Filter>;
};

export enum VotingContract_OrderBy {
  AsAccount = 'asAccount',
  AsAccountId = 'asAccount__id',
  DelegateChangedEvent = 'delegateChangedEvent',
  DelegateVotesChangedEvent = 'delegateVotesChangedEvent',
  Delegation = 'delegation',
  Id = 'id',
  TotalWeight = 'totalWeight',
  TotalWeightId = 'totalWeight__id',
  TotalWeightValue = 'totalWeight__value',
  Weight = 'weight'
}

export type Withdraw = Event & {
  __typename?: 'Withdraw';
  amount: Scalars['BigInt']['output'];
  emitter: Account;
  id: Scalars['ID']['output'];
  locking: Locking;
  owner: Account;
  timestamp: Scalars['BigInt']['output'];
  transaction: Transaction;
};

export type Withdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte: InputMaybe<Scalars['BigInt']['input']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte: InputMaybe<Scalars['BigInt']['input']>;
  amount_not: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>;
  emitter: InputMaybe<Scalars['String']['input']>;
  emitter_: InputMaybe<Account_Filter>;
  emitter_contains: InputMaybe<Scalars['String']['input']>;
  emitter_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_gt: InputMaybe<Scalars['String']['input']>;
  emitter_gte: InputMaybe<Scalars['String']['input']>;
  emitter_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_lt: InputMaybe<Scalars['String']['input']>;
  emitter_lte: InputMaybe<Scalars['String']['input']>;
  emitter_not: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains: InputMaybe<Scalars['String']['input']>;
  emitter_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  emitter_not_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with: InputMaybe<Scalars['String']['input']>;
  emitter_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  id_gt: InputMaybe<Scalars['ID']['input']>;
  id_gte: InputMaybe<Scalars['ID']['input']>;
  id_in: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt: InputMaybe<Scalars['ID']['input']>;
  id_lte: InputMaybe<Scalars['ID']['input']>;
  id_not: InputMaybe<Scalars['ID']['input']>;
  id_not_in: InputMaybe<Array<Scalars['ID']['input']>>;
  locking: InputMaybe<Scalars['String']['input']>;
  locking_: InputMaybe<Locking_Filter>;
  locking_contains: InputMaybe<Scalars['String']['input']>;
  locking_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_gt: InputMaybe<Scalars['String']['input']>;
  locking_gte: InputMaybe<Scalars['String']['input']>;
  locking_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_lt: InputMaybe<Scalars['String']['input']>;
  locking_lte: InputMaybe<Scalars['String']['input']>;
  locking_not: InputMaybe<Scalars['String']['input']>;
  locking_not_contains: InputMaybe<Scalars['String']['input']>;
  locking_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with: InputMaybe<Scalars['String']['input']>;
  locking_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  locking_not_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  locking_starts_with: InputMaybe<Scalars['String']['input']>;
  locking_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  or: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>;
  owner: InputMaybe<Scalars['String']['input']>;
  owner_: InputMaybe<Account_Filter>;
  owner_contains: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_gt: InputMaybe<Scalars['String']['input']>;
  owner_gte: InputMaybe<Scalars['String']['input']>;
  owner_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt: InputMaybe<Scalars['String']['input']>;
  owner_lte: InputMaybe<Scalars['String']['input']>;
  owner_not: InputMaybe<Scalars['String']['input']>;
  owner_not_contains: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  owner_starts_with: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  timestamp: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction: InputMaybe<Scalars['String']['input']>;
  transaction_: InputMaybe<Transaction_Filter>;
  transaction_contains: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_gt: InputMaybe<Scalars['String']['input']>;
  transaction_gte: InputMaybe<Scalars['String']['input']>;
  transaction_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt: InputMaybe<Scalars['String']['input']>;
  transaction_lte: InputMaybe<Scalars['String']['input']>;
  transaction_not: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_not_in: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase: InputMaybe<Scalars['String']['input']>;
};

export enum Withdraw_OrderBy {
  Amount = 'amount',
  Emitter = 'emitter',
  EmitterId = 'emitter__id',
  Id = 'id',
  Locking = 'locking',
  LockingId = 'locking__id',
  LockingMode = 'locking__mode',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionId = 'transaction__id',
  TransactionTimestamp = 'transaction__timestamp'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type ProposalFieldsFragment = { __typename?: 'Proposal', proposalId: any, description: string, startBlock: any, endBlock: any, queued: boolean, canceled: boolean, executed: boolean, state: ProposalState, proposer: { __typename?: 'Account', id: any }, proposalCreated: Array<{ __typename?: 'ProposalCreated', timestamp: any }>, proposalQueued: Array<{ __typename?: 'ProposalQueued', eta: any }>, proposalExecuted: Array<{ __typename?: 'ProposalExecuted', transaction: { __typename?: 'Transaction', id: string, timestamp: any } }>, votecast: Array<{ __typename?: 'VoteCast', id: string, support: { __typename?: 'ProposalSupport', weight: any }, receipt: { __typename?: 'VoteReceipt', id: string, weight: any, voter: { __typename?: 'Account', id: any }, support: { __typename?: 'ProposalSupport', id: string, support: number } } }>, metadata: { __typename?: 'ProposalMetadata', title: string, description: string }, votes: { __typename?: 'ProposalVotes', total: any, for: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> }, against: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> }, abstain: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> } } };

export type GetAllLocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocksQuery = { __typename?: 'Query', locks: Array<{ __typename?: 'Lock', lockId: any, amount: any, time: any, slope: number, cliff: number, owner: { __typename?: 'Account', id: any }, lockCreate: Array<{ __typename?: 'LockCreate', id: string, timestamp: any }>, delegate: { __typename?: 'Account', id: any } }> };

export type GetDelegatesQueryVariables = Exact<{
  skip: InputMaybe<Scalars['Int']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDelegatesQuery = { __typename?: 'Query', locks: Array<{ __typename?: 'Lock', delegate: { __typename?: 'Account', id: any } }> };

export type GetLocksQueryVariables = Exact<{
  address: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLocksQuery = { __typename?: 'Query', locks: Array<{ __typename?: 'Lock', lockId: any, relocked: boolean, amount: any, time: any, slope: number, cliff: number, owner: { __typename?: 'Account', id: any }, replacedBy: { __typename?: 'Lock', id: string, lockId: any } | null, replaces: { __typename?: 'Lock', id: string, lockId: any } | null, lockCreate: Array<{ __typename?: 'LockCreate', id: string, timestamp: any }>, delegate: { __typename?: 'Account', id: any } }> };

export type GetProposalQueryVariables = Exact<{
  id: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetProposalQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', proposalId: any, description: string, startBlock: any, endBlock: any, queued: boolean, canceled: boolean, executed: boolean, state: ProposalState, calls: Array<{ __typename?: 'ProposalCall', index: number, value: any, signature: string, calldata: any, target: { __typename?: 'Account', id: any } }>, proposer: { __typename?: 'Account', id: any }, proposalCreated: Array<{ __typename?: 'ProposalCreated', timestamp: any }>, proposalQueued: Array<{ __typename?: 'ProposalQueued', eta: any }>, proposalExecuted: Array<{ __typename?: 'ProposalExecuted', transaction: { __typename?: 'Transaction', id: string, timestamp: any } }>, votecast: Array<{ __typename?: 'VoteCast', id: string, support: { __typename?: 'ProposalSupport', weight: any }, receipt: { __typename?: 'VoteReceipt', id: string, weight: any, voter: { __typename?: 'Account', id: any }, support: { __typename?: 'ProposalSupport', id: string, support: number } } }>, metadata: { __typename?: 'ProposalMetadata', title: string, description: string }, votes: { __typename?: 'ProposalVotes', total: any, for: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> }, against: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> }, abstain: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> } } }> };

export type GetProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProposalsQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', proposalId: any, description: string, startBlock: any, endBlock: any, queued: boolean, canceled: boolean, executed: boolean, state: ProposalState, proposer: { __typename?: 'Account', id: any }, proposalCreated: Array<{ __typename?: 'ProposalCreated', timestamp: any }>, proposalQueued: Array<{ __typename?: 'ProposalQueued', eta: any }>, proposalExecuted: Array<{ __typename?: 'ProposalExecuted', transaction: { __typename?: 'Transaction', id: string, timestamp: any } }>, votecast: Array<{ __typename?: 'VoteCast', id: string, support: { __typename?: 'ProposalSupport', weight: any }, receipt: { __typename?: 'VoteReceipt', id: string, weight: any, voter: { __typename?: 'Account', id: any }, support: { __typename?: 'ProposalSupport', id: string, support: number } } }>, metadata: { __typename?: 'ProposalMetadata', title: string, description: string }, votes: { __typename?: 'ProposalVotes', total: any, for: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> }, against: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> }, abstain: { __typename?: 'VoteType', total: any, participants: Array<{ __typename?: 'Participant', address: string, weight: any }> } } }> };

export const ProposalFieldsFragmentDoc = gql`
    fragment ProposalFields on Proposal {
  proposalId
  description
  proposer {
    id
  }
  proposalCreated {
    timestamp
  }
  proposalQueued {
    eta
  }
  proposalExecuted {
    transaction {
      id
      timestamp
    }
  }
  votecast {
    id
    support {
      weight
    }
    receipt {
      id
      voter {
        id
      }
      weight
      support {
        id
        support
      }
    }
  }
  startBlock
  endBlock
  queued
  canceled
  executed
  state @client
  metadata @client {
    title
    description
  }
  votes @client {
    for {
      participants {
        address
        weight
      }
      total
    }
    against {
      participants {
        address
        weight
      }
      total
    }
    abstain {
      participants {
        address
        weight
      }
      total
    }
    total
  }
}
    `;
export const GetAllLocksDocument = gql`
    query getAllLocks {
  locks(first: 1000, where: {relocked: false}) {
    lockId
    owner {
      id
    }
    amount
    time
    slope
    cliff
    lockCreate {
      id
      timestamp
    }
    delegate {
      id
    }
  }
}
    `;

/**
 * __useGetAllLocksQuery__
 *
 * To run a query within a React component, call `useGetAllLocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLocksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLocksQuery, GetAllLocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLocksQuery, GetAllLocksQueryVariables>(GetAllLocksDocument, options);
      }
export function useGetAllLocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLocksQuery, GetAllLocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLocksQuery, GetAllLocksQueryVariables>(GetAllLocksDocument, options);
        }
export function useGetAllLocksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllLocksQuery, GetAllLocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllLocksQuery, GetAllLocksQueryVariables>(GetAllLocksDocument, options);
        }
export type GetAllLocksQueryHookResult = ReturnType<typeof useGetAllLocksQuery>;
export type GetAllLocksLazyQueryHookResult = ReturnType<typeof useGetAllLocksLazyQuery>;
export type GetAllLocksSuspenseQueryHookResult = ReturnType<typeof useGetAllLocksSuspenseQuery>;
export type GetAllLocksQueryResult = Apollo.QueryResult<GetAllLocksQuery, GetAllLocksQueryVariables>;
export const GetDelegatesDocument = gql`
    query getDelegates($skip: Int, $first: Int) {
  locks(skip: $skip, first: $first) {
    delegate {
      id
    }
  }
}
    `;

/**
 * __useGetDelegatesQuery__
 *
 * To run a query within a React component, call `useGetDelegatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDelegatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDelegatesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetDelegatesQuery(baseOptions?: Apollo.QueryHookOptions<GetDelegatesQuery, GetDelegatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDelegatesQuery, GetDelegatesQueryVariables>(GetDelegatesDocument, options);
      }
export function useGetDelegatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDelegatesQuery, GetDelegatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDelegatesQuery, GetDelegatesQueryVariables>(GetDelegatesDocument, options);
        }
export function useGetDelegatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDelegatesQuery, GetDelegatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDelegatesQuery, GetDelegatesQueryVariables>(GetDelegatesDocument, options);
        }
export type GetDelegatesQueryHookResult = ReturnType<typeof useGetDelegatesQuery>;
export type GetDelegatesLazyQueryHookResult = ReturnType<typeof useGetDelegatesLazyQuery>;
export type GetDelegatesSuspenseQueryHookResult = ReturnType<typeof useGetDelegatesSuspenseQuery>;
export type GetDelegatesQueryResult = Apollo.QueryResult<GetDelegatesQuery, GetDelegatesQueryVariables>;
export const GetLocksDocument = gql`
    query getLocks($address: String) {
  locks(first: 1000, where: {owner: $address}) {
    lockId
    owner {
      id
    }
    replacedBy {
      id
      lockId
    }
    replaces {
      id
      lockId
    }
    relocked
    amount
    time
    slope
    cliff
    lockCreate {
      id
      timestamp
    }
    delegate {
      id
    }
  }
}
    `;

/**
 * __useGetLocksQuery__
 *
 * To run a query within a React component, call `useGetLocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocksQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetLocksQuery(baseOptions?: Apollo.QueryHookOptions<GetLocksQuery, GetLocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocksQuery, GetLocksQueryVariables>(GetLocksDocument, options);
      }
export function useGetLocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocksQuery, GetLocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocksQuery, GetLocksQueryVariables>(GetLocksDocument, options);
        }
export function useGetLocksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLocksQuery, GetLocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLocksQuery, GetLocksQueryVariables>(GetLocksDocument, options);
        }
export type GetLocksQueryHookResult = ReturnType<typeof useGetLocksQuery>;
export type GetLocksLazyQueryHookResult = ReturnType<typeof useGetLocksLazyQuery>;
export type GetLocksSuspenseQueryHookResult = ReturnType<typeof useGetLocksSuspenseQuery>;
export type GetLocksQueryResult = Apollo.QueryResult<GetLocksQuery, GetLocksQueryVariables>;
export const GetProposalDocument = gql`
    query getProposal($id: BigInt) {
  proposals(where: {proposalId: $id}) {
    ...ProposalFields
    calls(orderBy: index, orderDirection: asc) {
      index
      target {
        id
      }
      value
      signature
      calldata
    }
  }
}
    ${ProposalFieldsFragmentDoc}`;

/**
 * __useGetProposalQuery__
 *
 * To run a query within a React component, call `useGetProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProposalQuery(baseOptions?: Apollo.QueryHookOptions<GetProposalQuery, GetProposalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options);
      }
export function useGetProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalQuery, GetProposalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options);
        }
export function useGetProposalSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProposalQuery, GetProposalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options);
        }
export type GetProposalQueryHookResult = ReturnType<typeof useGetProposalQuery>;
export type GetProposalLazyQueryHookResult = ReturnType<typeof useGetProposalLazyQuery>;
export type GetProposalSuspenseQueryHookResult = ReturnType<typeof useGetProposalSuspenseQuery>;
export type GetProposalQueryResult = Apollo.QueryResult<GetProposalQuery, GetProposalQueryVariables>;
export const GetProposalsDocument = gql`
    query getProposals {
  proposals(first: 1000, orderBy: startBlock, orderDirection: desc) {
    ...ProposalFields
  }
}
    ${ProposalFieldsFragmentDoc}`;

/**
 * __useGetProposalsQuery__
 *
 * To run a query within a React component, call `useGetProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProposalsQuery(baseOptions?: Apollo.QueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
      }
export function useGetProposalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
        }
export function useGetProposalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
        }
export type GetProposalsQueryHookResult = ReturnType<typeof useGetProposalsQuery>;
export type GetProposalsLazyQueryHookResult = ReturnType<typeof useGetProposalsLazyQuery>;
export type GetProposalsSuspenseQueryHookResult = ReturnType<typeof useGetProposalsSuspenseQuery>;
export type GetProposalsQueryResult = Apollo.QueryResult<GetProposalsQuery, GetProposalsQueryVariables>;
export type AccessControlKeySpecifier = ('asAccount' | 'id' | 'roles' | AccessControlKeySpecifier)[];
export type AccessControlFieldPolicy = {
	asAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccessControlRoleKeySpecifier = ('admin' | 'adminOf' | 'contract' | 'id' | 'members' | 'role' | 'roleAdminChanged' | 'roleGranted' | 'roleRevoked' | AccessControlRoleKeySpecifier)[];
export type AccessControlRoleFieldPolicy = {
	admin?: FieldPolicy<any> | FieldReadFunction<any>,
	adminOf?: FieldPolicy<any> | FieldReadFunction<any>,
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	roleAdminChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGranted?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevoked?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccessControlRoleMemberKeySpecifier = ('accesscontrolrole' | 'account' | 'id' | AccessControlRoleMemberKeySpecifier)[];
export type AccessControlRoleMemberFieldPolicy = {
	accesscontrolrole?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountKeySpecifier = ('asAccessControl' | 'asGovernor' | 'asLocking' | 'asTimelock' | 'asVoting' | 'delegateChangedEvent' | 'delegateChangedFromEvent' | 'delegateChangedToEvent' | 'delegateVotesChangedEvent' | 'delegationFrom' | 'delegationTo' | 'events' | 'id' | 'locks' | 'membership' | 'proposed' | 'proposedCalls' | 'roleGranted' | 'roleGrantedSender' | 'roleRevoked' | 'roleRevokedSender' | 'timelockedCalls' | 'voteWeigth' | 'voted' | AccountKeySpecifier)[];
export type AccountFieldPolicy = {
	asAccessControl?: FieldPolicy<any> | FieldReadFunction<any>,
	asGovernor?: FieldPolicy<any> | FieldReadFunction<any>,
	asLocking?: FieldPolicy<any> | FieldReadFunction<any>,
	asTimelock?: FieldPolicy<any> | FieldReadFunction<any>,
	asVoting?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangedEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangedFromEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangedToEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChangedEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegationFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	delegationTo?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locks?: FieldPolicy<any> | FieldReadFunction<any>,
	membership?: FieldPolicy<any> | FieldReadFunction<any>,
	proposed?: FieldPolicy<any> | FieldReadFunction<any>,
	proposedCalls?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGranted?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGrantedSender?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevoked?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevokedSender?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockedCalls?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeigth?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DelegateKeySpecifier = ('delegate' | 'emitter' | 'id' | 'lock' | 'locking' | 'owner' | 'timestamp' | 'transaction' | DelegateKeySpecifier)[];
export type DelegateFieldPolicy = {
	delegate?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lock?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DelegateChangedKeySpecifier = ('contract' | 'delegation' | 'delegator' | 'emitter' | 'fromDelegate' | 'id' | 'timestamp' | 'toDelegate' | 'transaction' | DelegateChangedKeySpecifier)[];
export type DelegateChangedFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	delegation?: FieldPolicy<any> | FieldReadFunction<any>,
	delegator?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	fromDelegate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	toDelegate?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DelegateVotesChangedKeySpecifier = ('contract' | 'delegate' | 'emitter' | 'id' | 'newValue' | 'oldValue' | 'timestamp' | 'transaction' | 'voteWeight' | DelegateVotesChangedKeySpecifier)[];
export type DelegateVotesChangedFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	delegate?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newValue?: FieldPolicy<any> | FieldReadFunction<any>,
	oldValue?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventKeySpecifier = ('emitter' | 'id' | 'timestamp' | 'transaction' | EventKeySpecifier)[];
export type EventFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GovernorKeySpecifier = ('asAccount' | 'id' | 'mode' | 'proposalCanceled' | 'proposalCreated' | 'proposalExecuted' | 'proposalQueued' | 'proposals' | 'votecast' | GovernorKeySpecifier)[];
export type GovernorFieldPolicy = {
	asAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	mode?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCanceled?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalExecuted?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalQueued?: FieldPolicy<any> | FieldReadFunction<any>,
	proposals?: FieldPolicy<any> | FieldReadFunction<any>,
	votecast?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LockKeySpecifier = ('amount' | 'cliff' | 'delegate' | 'id' | 'lockCreate' | 'lockId' | 'locking' | 'owner' | 'relock' | 'relocked' | 'replacedBy' | 'replaces' | 'slope' | 'time' | LockKeySpecifier)[];
export type LockFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	cliff?: FieldPolicy<any> | FieldReadFunction<any>,
	delegate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lockCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	lockId?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	relock?: FieldPolicy<any> | FieldReadFunction<any>,
	relocked?: FieldPolicy<any> | FieldReadFunction<any>,
	replacedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	replaces?: FieldPolicy<any> | FieldReadFunction<any>,
	slope?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LockCreateKeySpecifier = ('emitter' | 'id' | 'lock' | 'locking' | 'owner' | 'timestamp' | 'transaction' | LockCreateKeySpecifier)[];
export type LockCreateFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lock?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LockingKeySpecifier = ('asAccount' | 'delegate' | 'id' | 'lockCreate' | 'locks' | 'mode' | 'relock' | 'withdraw' | LockingKeySpecifier)[];
export type LockingFieldPolicy = {
	asAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	delegate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lockCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	locks?: FieldPolicy<any> | FieldReadFunction<any>,
	mode?: FieldPolicy<any> | FieldReadFunction<any>,
	relock?: FieldPolicy<any> | FieldReadFunction<any>,
	withdraw?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ParticipantKeySpecifier = ('address' | 'weight' | ParticipantKeySpecifier)[];
export type ParticipantFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	weight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalKeySpecifier = ('calls' | 'canceled' | 'description' | 'endBlock' | 'eta' | 'executed' | 'governor' | 'id' | 'metadata' | 'proposalCanceled' | 'proposalCreated' | 'proposalExecuted' | 'proposalId' | 'proposalQueued' | 'proposer' | 'queued' | 'receipts' | 'startBlock' | 'state' | 'supports' | 'votecast' | 'votes' | ProposalKeySpecifier)[];
export type ProposalFieldPolicy = {
	calls?: FieldPolicy<any> | FieldReadFunction<any>,
	canceled?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	endBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	eta?: FieldPolicy<any> | FieldReadFunction<any>,
	executed?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCanceled?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalExecuted?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalId?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalQueued?: FieldPolicy<any> | FieldReadFunction<any>,
	proposer?: FieldPolicy<any> | FieldReadFunction<any>,
	queued?: FieldPolicy<any> | FieldReadFunction<any>,
	receipts?: FieldPolicy<any> | FieldReadFunction<any>,
	startBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	supports?: FieldPolicy<any> | FieldReadFunction<any>,
	votecast?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalCallKeySpecifier = ('calldata' | 'id' | 'index' | 'proposal' | 'signature' | 'target' | 'value' | ProposalCallKeySpecifier)[];
export type ProposalCallFieldPolicy = {
	calldata?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalCanceledKeySpecifier = ('emitter' | 'governor' | 'id' | 'proposal' | 'timestamp' | 'transaction' | ProposalCanceledKeySpecifier)[];
export type ProposalCanceledFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalCreatedKeySpecifier = ('emitter' | 'governor' | 'id' | 'proposal' | 'proposer' | 'timestamp' | 'transaction' | ProposalCreatedKeySpecifier)[];
export type ProposalCreatedFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	proposer?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalExecutedKeySpecifier = ('emitter' | 'governor' | 'id' | 'proposal' | 'timestamp' | 'transaction' | ProposalExecutedKeySpecifier)[];
export type ProposalExecutedFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalMetadataKeySpecifier = ('description' | 'title' | ProposalMetadataKeySpecifier)[];
export type ProposalMetadataFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalQueuedKeySpecifier = ('emitter' | 'eta' | 'governor' | 'id' | 'proposal' | 'timestamp' | 'transaction' | ProposalQueuedKeySpecifier)[];
export type ProposalQueuedFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	eta?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalSupportKeySpecifier = ('id' | 'proposal' | 'support' | 'votes' | 'weight' | ProposalSupportKeySpecifier)[];
export type ProposalSupportFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	support?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>,
	weight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProposalVotesKeySpecifier = ('abstain' | 'against' | 'for' | 'total' | ProposalVotesKeySpecifier)[];
export type ProposalVotesFieldPolicy = {
	abstain?: FieldPolicy<any> | FieldReadFunction<any>,
	against?: FieldPolicy<any> | FieldReadFunction<any>,
	for?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('_meta' | 'accessControl' | 'accessControlRole' | 'accessControlRoleMember' | 'accessControlRoleMembers' | 'accessControlRoles' | 'accessControls' | 'account' | 'accounts' | 'delegate' | 'delegateChanged' | 'delegateChangeds' | 'delegateVotesChanged' | 'delegateVotesChangeds' | 'delegates' | 'event' | 'events' | 'governor' | 'governors' | 'lock' | 'lockCreate' | 'lockCreates' | 'locking' | 'lockings' | 'locks' | 'proposal' | 'proposalCall' | 'proposalCalls' | 'proposalCanceled' | 'proposalCanceleds' | 'proposalCreated' | 'proposalCreateds' | 'proposalExecuted' | 'proposalExecuteds' | 'proposalQueued' | 'proposalQueueds' | 'proposalSupport' | 'proposalSupports' | 'proposals' | 'relock' | 'relocks' | 'role' | 'roleAdminChanged' | 'roleAdminChangeds' | 'roleGranted' | 'roleGranteds' | 'roleRevoked' | 'roleRevokeds' | 'roles' | 'timelock' | 'timelockCall' | 'timelockCalls' | 'timelockMinDelayChange' | 'timelockMinDelayChanges' | 'timelockOperation' | 'timelockOperationCancelled' | 'timelockOperationCancelleds' | 'timelockOperationExecuted' | 'timelockOperationExecuteds' | 'timelockOperationScheduled' | 'timelockOperationScheduleds' | 'timelockOperations' | 'timelocks' | 'transaction' | 'transactions' | 'voteCast' | 'voteCasts' | 'voteDelegation' | 'voteDelegations' | 'voteReceipt' | 'voteReceipts' | 'voteWeight' | 'voteWeights' | 'votingContract' | 'votingContracts' | 'withdraw' | 'withdraws' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	_meta?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControl?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRole?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRoleMember?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRoleMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControls?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	delegate?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangeds?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChangeds?: FieldPolicy<any> | FieldReadFunction<any>,
	delegates?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	governors?: FieldPolicy<any> | FieldReadFunction<any>,
	lock?: FieldPolicy<any> | FieldReadFunction<any>,
	lockCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	lockCreates?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	lockings?: FieldPolicy<any> | FieldReadFunction<any>,
	locks?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCall?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCalls?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCanceled?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCanceleds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCreateds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalExecuted?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalExecuteds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalQueued?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalQueueds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalSupport?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalSupports?: FieldPolicy<any> | FieldReadFunction<any>,
	proposals?: FieldPolicy<any> | FieldReadFunction<any>,
	relock?: FieldPolicy<any> | FieldReadFunction<any>,
	relocks?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	roleAdminChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	roleAdminChangeds?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGranted?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGranteds?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevoked?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevokeds?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	timelock?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockCall?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockCalls?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockMinDelayChange?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockMinDelayChanges?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperation?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationCancelled?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationCancelleds?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationExecuted?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationExecuteds?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationScheduled?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationScheduleds?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperations?: FieldPolicy<any> | FieldReadFunction<any>,
	timelocks?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>,
	voteCast?: FieldPolicy<any> | FieldReadFunction<any>,
	voteCasts?: FieldPolicy<any> | FieldReadFunction<any>,
	voteDelegation?: FieldPolicy<any> | FieldReadFunction<any>,
	voteDelegations?: FieldPolicy<any> | FieldReadFunction<any>,
	voteReceipt?: FieldPolicy<any> | FieldReadFunction<any>,
	voteReceipts?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeight?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeights?: FieldPolicy<any> | FieldReadFunction<any>,
	votingContract?: FieldPolicy<any> | FieldReadFunction<any>,
	votingContracts?: FieldPolicy<any> | FieldReadFunction<any>,
	withdraw?: FieldPolicy<any> | FieldReadFunction<any>,
	withdraws?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RelockKeySpecifier = ('emitter' | 'id' | 'locking' | 'newLock' | 'oldLock' | 'owner' | 'timestamp' | 'transaction' | RelockKeySpecifier)[];
export type RelockFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	newLock?: FieldPolicy<any> | FieldReadFunction<any>,
	oldLock?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleKeySpecifier = ('id' | 'roleOf' | RoleKeySpecifier)[];
export type RoleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	roleOf?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleAdminChangedKeySpecifier = ('emitter' | 'id' | 'newAdminRole' | 'previousAdminRole' | 'role' | 'timestamp' | 'transaction' | RoleAdminChangedKeySpecifier)[];
export type RoleAdminChangedFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newAdminRole?: FieldPolicy<any> | FieldReadFunction<any>,
	previousAdminRole?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleGrantedKeySpecifier = ('account' | 'emitter' | 'id' | 'role' | 'sender' | 'timestamp' | 'transaction' | RoleGrantedKeySpecifier)[];
export type RoleGrantedFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	sender?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleRevokedKeySpecifier = ('account' | 'emitter' | 'id' | 'role' | 'sender' | 'timestamp' | 'transaction' | RoleRevokedKeySpecifier)[];
export type RoleRevokedFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	sender?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('_meta' | 'accessControl' | 'accessControlRole' | 'accessControlRoleMember' | 'accessControlRoleMembers' | 'accessControlRoles' | 'accessControls' | 'account' | 'accounts' | 'delegate' | 'delegateChanged' | 'delegateChangeds' | 'delegateVotesChanged' | 'delegateVotesChangeds' | 'delegates' | 'event' | 'events' | 'governor' | 'governors' | 'lock' | 'lockCreate' | 'lockCreates' | 'locking' | 'lockings' | 'locks' | 'proposal' | 'proposalCall' | 'proposalCalls' | 'proposalCanceled' | 'proposalCanceleds' | 'proposalCreated' | 'proposalCreateds' | 'proposalExecuted' | 'proposalExecuteds' | 'proposalQueued' | 'proposalQueueds' | 'proposalSupport' | 'proposalSupports' | 'proposals' | 'relock' | 'relocks' | 'role' | 'roleAdminChanged' | 'roleAdminChangeds' | 'roleGranted' | 'roleGranteds' | 'roleRevoked' | 'roleRevokeds' | 'roles' | 'timelock' | 'timelockCall' | 'timelockCalls' | 'timelockMinDelayChange' | 'timelockMinDelayChanges' | 'timelockOperation' | 'timelockOperationCancelled' | 'timelockOperationCancelleds' | 'timelockOperationExecuted' | 'timelockOperationExecuteds' | 'timelockOperationScheduled' | 'timelockOperationScheduleds' | 'timelockOperations' | 'timelocks' | 'transaction' | 'transactions' | 'voteCast' | 'voteCasts' | 'voteDelegation' | 'voteDelegations' | 'voteReceipt' | 'voteReceipts' | 'voteWeight' | 'voteWeights' | 'votingContract' | 'votingContracts' | 'withdraw' | 'withdraws' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	_meta?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControl?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRole?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRoleMember?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRoleMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControlRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	accessControls?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	delegate?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangeds?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChangeds?: FieldPolicy<any> | FieldReadFunction<any>,
	delegates?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	governors?: FieldPolicy<any> | FieldReadFunction<any>,
	lock?: FieldPolicy<any> | FieldReadFunction<any>,
	lockCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	lockCreates?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	lockings?: FieldPolicy<any> | FieldReadFunction<any>,
	locks?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCall?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCalls?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCanceled?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCanceleds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalCreateds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalExecuted?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalExecuteds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalQueued?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalQueueds?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalSupport?: FieldPolicy<any> | FieldReadFunction<any>,
	proposalSupports?: FieldPolicy<any> | FieldReadFunction<any>,
	proposals?: FieldPolicy<any> | FieldReadFunction<any>,
	relock?: FieldPolicy<any> | FieldReadFunction<any>,
	relocks?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	roleAdminChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	roleAdminChangeds?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGranted?: FieldPolicy<any> | FieldReadFunction<any>,
	roleGranteds?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevoked?: FieldPolicy<any> | FieldReadFunction<any>,
	roleRevokeds?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	timelock?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockCall?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockCalls?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockMinDelayChange?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockMinDelayChanges?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperation?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationCancelled?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationCancelleds?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationExecuted?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationExecuteds?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationScheduled?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperationScheduleds?: FieldPolicy<any> | FieldReadFunction<any>,
	timelockOperations?: FieldPolicy<any> | FieldReadFunction<any>,
	timelocks?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>,
	voteCast?: FieldPolicy<any> | FieldReadFunction<any>,
	voteCasts?: FieldPolicy<any> | FieldReadFunction<any>,
	voteDelegation?: FieldPolicy<any> | FieldReadFunction<any>,
	voteDelegations?: FieldPolicy<any> | FieldReadFunction<any>,
	voteReceipt?: FieldPolicy<any> | FieldReadFunction<any>,
	voteReceipts?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeight?: FieldPolicy<any> | FieldReadFunction<any>,
	voteWeights?: FieldPolicy<any> | FieldReadFunction<any>,
	votingContract?: FieldPolicy<any> | FieldReadFunction<any>,
	votingContracts?: FieldPolicy<any> | FieldReadFunction<any>,
	withdraw?: FieldPolicy<any> | FieldReadFunction<any>,
	withdraws?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockKeySpecifier = ('asAccount' | 'cancelled' | 'executed' | 'id' | 'mindelaychange' | 'operations' | 'scheduled' | TimelockKeySpecifier)[];
export type TimelockFieldPolicy = {
	asAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelled?: FieldPolicy<any> | FieldReadFunction<any>,
	executed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	mindelaychange?: FieldPolicy<any> | FieldReadFunction<any>,
	operations?: FieldPolicy<any> | FieldReadFunction<any>,
	scheduled?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockCallKeySpecifier = ('data' | 'executed' | 'id' | 'index' | 'operation' | 'scheduled' | 'target' | 'value' | TimelockCallKeySpecifier)[];
export type TimelockCallFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	executed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	operation?: FieldPolicy<any> | FieldReadFunction<any>,
	scheduled?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockMinDelayChangeKeySpecifier = ('contract' | 'delay' | 'emitter' | 'id' | 'timestamp' | 'transaction' | TimelockMinDelayChangeKeySpecifier)[];
export type TimelockMinDelayChangeFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	delay?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockOperationKeySpecifier = ('calls' | 'cancelled' | 'contract' | 'delay' | 'executed' | 'id' | 'predecessor' | 'scheduled' | 'status' | 'timestamp' | TimelockOperationKeySpecifier)[];
export type TimelockOperationFieldPolicy = {
	calls?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelled?: FieldPolicy<any> | FieldReadFunction<any>,
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	delay?: FieldPolicy<any> | FieldReadFunction<any>,
	executed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	predecessor?: FieldPolicy<any> | FieldReadFunction<any>,
	scheduled?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockOperationCancelledKeySpecifier = ('contract' | 'emitter' | 'id' | 'operation' | 'timestamp' | 'transaction' | TimelockOperationCancelledKeySpecifier)[];
export type TimelockOperationCancelledFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	operation?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockOperationExecutedKeySpecifier = ('call' | 'contract' | 'emitter' | 'id' | 'operation' | 'timestamp' | 'transaction' | TimelockOperationExecutedKeySpecifier)[];
export type TimelockOperationExecutedFieldPolicy = {
	call?: FieldPolicy<any> | FieldReadFunction<any>,
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	operation?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelockOperationScheduledKeySpecifier = ('call' | 'contract' | 'emitter' | 'id' | 'operation' | 'timestamp' | 'transaction' | TimelockOperationScheduledKeySpecifier)[];
export type TimelockOperationScheduledFieldPolicy = {
	call?: FieldPolicy<any> | FieldReadFunction<any>,
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	operation?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionKeySpecifier = ('blockNumber' | 'events' | 'id' | 'timestamp' | TransactionKeySpecifier)[];
export type TransactionFieldPolicy = {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteCastKeySpecifier = ('emitter' | 'governor' | 'id' | 'proposal' | 'receipt' | 'support' | 'timestamp' | 'transaction' | 'voter' | VoteCastKeySpecifier)[];
export type VoteCastFieldPolicy = {
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	governor?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	receipt?: FieldPolicy<any> | FieldReadFunction<any>,
	support?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>,
	voter?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteDelegationKeySpecifier = ('contract' | 'delegateChangedEvent' | 'delegatee' | 'delegator' | 'id' | VoteDelegationKeySpecifier)[];
export type VoteDelegationFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangedEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegatee?: FieldPolicy<any> | FieldReadFunction<any>,
	delegator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteReceiptKeySpecifier = ('id' | 'params' | 'proposal' | 'reason' | 'support' | 'voter' | 'weight' | VoteReceiptKeySpecifier)[];
export type VoteReceiptFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	params?: FieldPolicy<any> | FieldReadFunction<any>,
	proposal?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	support?: FieldPolicy<any> | FieldReadFunction<any>,
	voter?: FieldPolicy<any> | FieldReadFunction<any>,
	weight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteTypeKeySpecifier = ('participants' | 'total' | VoteTypeKeySpecifier)[];
export type VoteTypeFieldPolicy = {
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteWeightKeySpecifier = ('account' | 'contract' | 'delegateVotesChangedEvent' | 'id' | 'value' | VoteWeightKeySpecifier)[];
export type VoteWeightFieldPolicy = {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChangedEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VotingContractKeySpecifier = ('asAccount' | 'delegateChangedEvent' | 'delegateVotesChangedEvent' | 'delegation' | 'id' | 'totalWeight' | 'weight' | VotingContractKeySpecifier)[];
export type VotingContractFieldPolicy = {
	asAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateChangedEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateVotesChangedEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	delegation?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	totalWeight?: FieldPolicy<any> | FieldReadFunction<any>,
	weight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawKeySpecifier = ('amount' | 'emitter' | 'id' | 'locking' | 'owner' | 'timestamp' | 'transaction' | WithdrawKeySpecifier)[];
export type WithdrawFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	emitter?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locking?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _Block_KeySpecifier = ('hash' | 'number' | 'parentHash' | 'timestamp' | _Block_KeySpecifier)[];
export type _Block_FieldPolicy = {
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	number?: FieldPolicy<any> | FieldReadFunction<any>,
	parentHash?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _Meta_KeySpecifier = ('block' | 'deployment' | 'hasIndexingErrors' | _Meta_KeySpecifier)[];
export type _Meta_FieldPolicy = {
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	deployment?: FieldPolicy<any> | FieldReadFunction<any>,
	hasIndexingErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AccessControl?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccessControlKeySpecifier | (() => undefined | AccessControlKeySpecifier),
		fields?: AccessControlFieldPolicy,
	},
	AccessControlRole?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccessControlRoleKeySpecifier | (() => undefined | AccessControlRoleKeySpecifier),
		fields?: AccessControlRoleFieldPolicy,
	},
	AccessControlRoleMember?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccessControlRoleMemberKeySpecifier | (() => undefined | AccessControlRoleMemberKeySpecifier),
		fields?: AccessControlRoleMemberFieldPolicy,
	},
	Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier),
		fields?: AccountFieldPolicy,
	},
	Delegate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DelegateKeySpecifier | (() => undefined | DelegateKeySpecifier),
		fields?: DelegateFieldPolicy,
	},
	DelegateChanged?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DelegateChangedKeySpecifier | (() => undefined | DelegateChangedKeySpecifier),
		fields?: DelegateChangedFieldPolicy,
	},
	DelegateVotesChanged?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DelegateVotesChangedKeySpecifier | (() => undefined | DelegateVotesChangedKeySpecifier),
		fields?: DelegateVotesChangedFieldPolicy,
	},
	Event?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventKeySpecifier | (() => undefined | EventKeySpecifier),
		fields?: EventFieldPolicy,
	},
	Governor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GovernorKeySpecifier | (() => undefined | GovernorKeySpecifier),
		fields?: GovernorFieldPolicy,
	},
	Lock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LockKeySpecifier | (() => undefined | LockKeySpecifier),
		fields?: LockFieldPolicy,
	},
	LockCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LockCreateKeySpecifier | (() => undefined | LockCreateKeySpecifier),
		fields?: LockCreateFieldPolicy,
	},
	Locking?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LockingKeySpecifier | (() => undefined | LockingKeySpecifier),
		fields?: LockingFieldPolicy,
	},
	Participant?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ParticipantKeySpecifier | (() => undefined | ParticipantKeySpecifier),
		fields?: ParticipantFieldPolicy,
	},
	Proposal?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalKeySpecifier | (() => undefined | ProposalKeySpecifier),
		fields?: ProposalFieldPolicy,
	},
	ProposalCall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalCallKeySpecifier | (() => undefined | ProposalCallKeySpecifier),
		fields?: ProposalCallFieldPolicy,
	},
	ProposalCanceled?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalCanceledKeySpecifier | (() => undefined | ProposalCanceledKeySpecifier),
		fields?: ProposalCanceledFieldPolicy,
	},
	ProposalCreated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalCreatedKeySpecifier | (() => undefined | ProposalCreatedKeySpecifier),
		fields?: ProposalCreatedFieldPolicy,
	},
	ProposalExecuted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalExecutedKeySpecifier | (() => undefined | ProposalExecutedKeySpecifier),
		fields?: ProposalExecutedFieldPolicy,
	},
	ProposalMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalMetadataKeySpecifier | (() => undefined | ProposalMetadataKeySpecifier),
		fields?: ProposalMetadataFieldPolicy,
	},
	ProposalQueued?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalQueuedKeySpecifier | (() => undefined | ProposalQueuedKeySpecifier),
		fields?: ProposalQueuedFieldPolicy,
	},
	ProposalSupport?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalSupportKeySpecifier | (() => undefined | ProposalSupportKeySpecifier),
		fields?: ProposalSupportFieldPolicy,
	},
	ProposalVotes?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProposalVotesKeySpecifier | (() => undefined | ProposalVotesKeySpecifier),
		fields?: ProposalVotesFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Relock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RelockKeySpecifier | (() => undefined | RelockKeySpecifier),
		fields?: RelockFieldPolicy,
	},
	Role?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleKeySpecifier | (() => undefined | RoleKeySpecifier),
		fields?: RoleFieldPolicy,
	},
	RoleAdminChanged?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleAdminChangedKeySpecifier | (() => undefined | RoleAdminChangedKeySpecifier),
		fields?: RoleAdminChangedFieldPolicy,
	},
	RoleGranted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleGrantedKeySpecifier | (() => undefined | RoleGrantedKeySpecifier),
		fields?: RoleGrantedFieldPolicy,
	},
	RoleRevoked?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleRevokedKeySpecifier | (() => undefined | RoleRevokedKeySpecifier),
		fields?: RoleRevokedFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	Timelock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockKeySpecifier | (() => undefined | TimelockKeySpecifier),
		fields?: TimelockFieldPolicy,
	},
	TimelockCall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockCallKeySpecifier | (() => undefined | TimelockCallKeySpecifier),
		fields?: TimelockCallFieldPolicy,
	},
	TimelockMinDelayChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockMinDelayChangeKeySpecifier | (() => undefined | TimelockMinDelayChangeKeySpecifier),
		fields?: TimelockMinDelayChangeFieldPolicy,
	},
	TimelockOperation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockOperationKeySpecifier | (() => undefined | TimelockOperationKeySpecifier),
		fields?: TimelockOperationFieldPolicy,
	},
	TimelockOperationCancelled?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockOperationCancelledKeySpecifier | (() => undefined | TimelockOperationCancelledKeySpecifier),
		fields?: TimelockOperationCancelledFieldPolicy,
	},
	TimelockOperationExecuted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockOperationExecutedKeySpecifier | (() => undefined | TimelockOperationExecutedKeySpecifier),
		fields?: TimelockOperationExecutedFieldPolicy,
	},
	TimelockOperationScheduled?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelockOperationScheduledKeySpecifier | (() => undefined | TimelockOperationScheduledKeySpecifier),
		fields?: TimelockOperationScheduledFieldPolicy,
	},
	Transaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionKeySpecifier | (() => undefined | TransactionKeySpecifier),
		fields?: TransactionFieldPolicy,
	},
	VoteCast?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteCastKeySpecifier | (() => undefined | VoteCastKeySpecifier),
		fields?: VoteCastFieldPolicy,
	},
	VoteDelegation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteDelegationKeySpecifier | (() => undefined | VoteDelegationKeySpecifier),
		fields?: VoteDelegationFieldPolicy,
	},
	VoteReceipt?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteReceiptKeySpecifier | (() => undefined | VoteReceiptKeySpecifier),
		fields?: VoteReceiptFieldPolicy,
	},
	VoteType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteTypeKeySpecifier | (() => undefined | VoteTypeKeySpecifier),
		fields?: VoteTypeFieldPolicy,
	},
	VoteWeight?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteWeightKeySpecifier | (() => undefined | VoteWeightKeySpecifier),
		fields?: VoteWeightFieldPolicy,
	},
	VotingContract?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VotingContractKeySpecifier | (() => undefined | VotingContractKeySpecifier),
		fields?: VotingContractFieldPolicy,
	},
	Withdraw?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawKeySpecifier | (() => undefined | WithdrawKeySpecifier),
		fields?: WithdrawFieldPolicy,
	},
	_Block_?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _Block_KeySpecifier | (() => undefined | _Block_KeySpecifier),
		fields?: _Block_FieldPolicy,
	},
	_Meta_?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _Meta_KeySpecifier | (() => undefined | _Meta_KeySpecifier),
		fields?: _Meta_FieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;