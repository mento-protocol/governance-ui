# Mento Governance development docs

[Home](../README.md) / Introduction

These documents provide an overview of the inner workings of the Governance app.

## Table of contents

- [Data sources](./state/data-sources.md)
- [Contracts overview](#contract-overview)
- [Actions](./actions/index.md)

# Contract overview

## Contract information links

| Contract | Network info | Read actions | Write actions | Interfaces |
| --- | --- | --- | --- | --- | 
| `Mento` | [Network Info](./state/contracts.md) | [Read](./actions/mento/reads.md) | [Write](./actions/mento/writes.md) | [Interfaces]() |
| `Locking` | [Network Info](./state/contracts.md) | [Read](./actions/locking/reads.md) | [Write](./actions/locking/writes.md) | [Interfaces]() |
| `Governor` | [Network Info](./state/contracts.md) | [Read](./actions/governor/reads.md) | [Write](./actions/governor/writes.md) | [Interfaces]() |


## Core concepts

### Mento 

The core mento governance token.

### Locking 

This is the `veMENTO` locking contract, this facilitates staking `MENTO` tokens for use in governance.

### Governor

This contract facilitates all actions relating to governance proposals.


