# Contract state overview

[Home](../README.md) / [Docs](../index.md) / Contract State


# Mento 

The core `MENTO` governance token.

| Property | Type | Initial | Source | User dependant? | 
| --- | --- | --- | --- |  --- | 
| Balance | BigNumber | 0 | Wagmi | Yes |
| Approval | BigNumber | 0 | Wagmi | Yes |


# Locking 

This is the `veMENTO` locking contract, this facilitates staking `MENTO` tokens for use in governance.

| Property | Type | Initial | Source | User dependant? | 
| --- | --- | --- | --- | --- |
| Locks | Lock[] | [] | Wagmi | Yes |
| Balance | BigNumber | 0 | Wagmi | Yes |
| Total Supply | BigNumber | 0 | Wagmi | No |
| Total Voters | BigNumber | 0 | Wagmi | No |

# Governor

This contract facilitates all actions relating to governance proposals

| Property | Type | Initial | Source | User dependant? | 
| --- | --- | --- | --- | --- |
| Proposal Threshold | BigNumber | 0 | Wagmi | No |
| Proposals | Proposal[] | [] | Graph | No |
| Quorum | BigNumber | 0 | Wagmi | No |
| Voting Period | BigNumber | 0 | Wagmi |No |
| Timelock | BigNumber | 0 | Wagmi | No |

