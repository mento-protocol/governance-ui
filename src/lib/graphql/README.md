# Apollo & GraphQL setup for TheGraph endpoints

## Apollo Type Policies

Apollo Type policies are a way to extend GraphQL schemas with client side only values that can originate either from the server data model itself by reinterpreting it, or can be locally stored.

### Adding a new field.

1. In an existing query for a datatype add a field with the `@client` directive.
   Example:

```graphql
query {
  proposals {
    id
    status @client
  }
}
```

2. Add the field to the `schema.client.graphql` file in an extends block:

```graphql
extend type Proposal {
  status: String!
}
```

> This could be an enum, but for the sake of keeping this example simple let's make it a string.

3. Go to the policiy file, if it exists, or create a new like:

```typescript
export const ProposalPolicity: TypePoliciy = {
    fields: {
        status: {
            read(_. { readField }): string {
                const isQueued = readField("queued") // read an existing field
                if (isQueued) return "queued";
                // Maybe query and RPC node?
                // ...
            }
        }
    }
}
```
