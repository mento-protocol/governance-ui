# Locking contract state change actions
[Home](../../../README.md) / [Docs](../../index.md) / [Actions](../index.md) / Locking contract state change

### Lock 
#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- MENTO Balance greater than 0
- Approval must be equal to or greater than requested locking volume

#### Mutations

- **Success**
    - Balances must be refreshed
    - Delegate function is now available
    - Voting function is now available

--- 

### Delegate

#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- Lock must be active
- Delegate must not be `address(0)` or any of the contract addresses

#### Mutations

- **Success**
    - Balances must be refreshed

---

### LockAndDelegate
#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- MENTO Balance greater than 0
- Approval must be equal to or greater than requested locking volume
- Delegate must not be `address(0)` or any of the contract addresses

#### Mutations

- **Success**
    - Balances must be refreshed

--- 

### Relock
#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- Lock must be active
- One of these options must be included:
    - If changing duration, time must be greater than current lock end period
    - If changing amount veMENTO balance must be equal to or greater than increasing amount
    - If changing delegate, delegate must not be `address(0)` or any of the contract addresses

#### Mutations

- **Success**
    - Balances must be refreshed
    - My Voting power should be refreshed

---

### Withdraw
#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- Locks must have expired to allow withdrawing

#### Mutations

- **Success**
    - Balances must be refreshed
