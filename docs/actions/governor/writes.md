# Governor state change actions

[Home](../../../README.md) / [Docs](../../index.md) / [Actions](../index.md) / Governor contract state change

### Propose

#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- MENTO Balance greater than 0
- Approval must be equal to or greater than the set amount to create a proposal (2500 veMENTO)

#### Mutations

- **Pending**

- **Failure**

  - Balances must be refreshed

- **Success**
  - Balances must be refreshed
  - Proposals must be refreshed

---

### CastVote

#### Prerequisites

- Wallet is connected
- CELO balance equal to or greater than gas cost
- veMENTO balance must be greater than 0
- Proposal must be active
- Vote must be `For` | `Against` | `Abstain`

#### Mutations

- **Pending**

- **Failure**

  - Balances must be refreshed

- **Success**
  - Balances must be refreshed
  - Proposals must be refreshed
