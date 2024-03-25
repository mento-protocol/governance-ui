# Wallet actions

<<<<<<< HEAD
[Home](../../README.md) / [Docs](../index.md) / [Actions](./index.md) / Wallet
=======
[Home](../README.md) / [Docs](../index.md) / [Actions](./index.md) / Wallet
>>>>>>> develop

### Is Connected
#### Mutations

- **Success - Returns true**
    - Balances must be fetched
    - Proposals must be filtered to view user's proposals
    - Locks must be fetched

---

### Connect wallet

#### Prerequisites

- Wallet not connected
- Wallet is approved wallet type

#### Mutations

- **Success**
    - Balances must be fetched
    - Proposals must be filtered to view user's proposals

---

### Change network

#### Prerequisites


- Wallet is connected

#### Mutations

- **Success**
    - Contract addresses changed
    - Balances need to be refreshed
    - Proposals need to be refreshed
    - Network name & icon to change