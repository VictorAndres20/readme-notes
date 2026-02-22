# GraphQL Cache Guide (Apollo Client)

## How Apollo Client Cache Works

Apollo Client uses an **in-memory normalized cache** that stores GraphQL query results. When a query executes:

1. **Normalization**: Apollo breaks down the response into individual objects
2. **Cache Keys**: Each object is stored with a unique identifier (typically `__typename:id`)
3. **References**: Nested objects are stored as references to their cache entries
4. **Automatic Updates**: When data with the same cache key is updated, all queries using that data automatically update

### Example

```graphql
query GetNotes {
  listNotes {
    items {
      id
      isPinned
      content
    }
  }
}
```

**Cache Storage:**

```javascript
{
  "Note:123": { id: "123", isPinned: false, content: "..." },
  "Note:456": { id: "456", isPinned: true, content: "..." },
  "ROOT_QUERY": {
    listNotes: {
      items: [
        { __ref: "Note:123" },
        { __ref: "Note:456" }
      ]
    }
  }
}
```

When a mutation updates `Note:123`, **all queries** using that note automatically see the change.

---

## Query Fetch Policies

Controls how queries interact with the cache **when reading data**.

### `cache-first` (Default)

**Behavior:**

1. Check cache first
2. If data exists, return it (no network request)
3. If missing, fetch from network and cache the result

**When to use:**

- ✅ Default for most queries
- ✅ Data doesn't change frequently
- ✅ You want optimal performance
- ✅ Stale data is acceptable

**Example:**

```typescript
useListNotesQuery({
  fetchPolicy: 'cache-first', // default
});
```

---

### `cache-only`

**Behavior:**

1. Read from cache only
2. Never makes network requests
3. Throws error if data not in cache

**When to use:**

- ✅ Reading data you know is already cached
- ✅ Offline mode
- ✅ Performance-critical reads where network is unacceptable

**Example:**

```typescript
useGetUserQuery({
  fetchPolicy: 'cache-only',
  skip: !userId, // Only read if we know it's cached
});
```

---

### `network-only`

**Behavior:**

1. Always fetch from network
2. Ignore cache completely on read
3. Update cache with network result

**When to use:**

- ✅ Data must be fresh (e.g., account balances, real-time data)
- ✅ Bypassing potentially stale cache
- ❌ Don't overuse - kills performance benefits

**Example:**

```typescript
useGetAccountBalanceQuery({
  fetchPolicy: 'network-only', // Always fetch latest balance
});
```

---

### `cache-and-network`

**Behavior:**

1. Return cached data immediately (if exists)
2. **Also** make network request in background
3. Update UI when network response arrives

**When to use:**

- ✅ Show fast initial data, then update with fresh data
- ✅ Balance between performance and freshness
- ✅ User sees instant results, then they update

**Example:**

```typescript
useListNotesQuery({
  fetchPolicy: 'cache-and-network', // Fast initial render + fresh data
});
```

**Result:** User sees cached notes immediately, then they update when fresh data arrives (may cause visual updates).

---

### `no-cache`

**Behavior:**

1. Always fetch from network
2. **Never** read from or write to cache

**When to use:**

- ✅ Sensitive/temporary data that shouldn't be cached
- ✅ One-time queries
- ⚠️ Rare - usually `network-only` is better

**Example:**

```typescript
useGetPasswordResetTokenQuery({
  fetchPolicy: 'no-cache', // Never cache sensitive tokens
});
```

---

### `standby`

**Behavior:**

1. Similar to `cache-first`
2. But won't automatically refetch on cache updates

**When to use:**

- ✅ You want manual control over refetching
- ✅ Rarely used in practice

---

## Mutation Fetch Policies

Controls how mutations interact with the cache **when writing data**.

### Default Behavior (No `fetchPolicy`)

**Behavior:**

1. Execute mutation
2. **Automatically write** mutation result to cache
3. Any queries with matching IDs automatically update

**When to use:**

- ✅ Default for most mutations
- ✅ Mutation returns updated object
- ✅ You want automatic UI updates

**Example:**

```typescript
const [updateNote] = useUpdateNoteMutation();

// Mutation returns: { id: "123", content: "Updated", isPinned: true }
// Cache automatically updates Note:123
// All queries using that note auto-update
```

**Pitfall:** Can cause **visual flashes** if the mutation result doesn't match final query order (see below).

### `no-cache` (Good if you don't want to update cache when get mutation data)

**Behavior:**

1. Execute mutation
2. **Don't write** result to cache
3. Manual cache updates only (via `refetchQueries` or `update`)

**When to use:**

- ✅ **Mutation changes list ordering** (pin/unpin, sort changes)
- ✅ Mutation affects data beyond what it returns
- ✅ Preventing visual flashes from intermediate state

**Example (Our Fix):**

```typescript
const [pinNote] = usePinNoteMutation({
  fetchPolicy: 'no-cache', // Don't cache mutation result
  refetchQueries: [{ query: ListNotesDocument }], // Refetch with correct order
  awaitRefetchQueries: true, // Wait for refetch before updating UI
});
```

**Why this works:**

- Without `no-cache`: Mutation updates `isPinned` → icon changes → refetch runs → notes reorder (2 visual updates = flash)
- With `no-cache`: Mutation executes → refetch runs → icon + ordering change together (1 smooth update)

---

## Additional Resources

- [Apollo Client Caching](https://www.apollographql.com/docs/react/caching/overview/)
- [Fetch Policies](https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy)
- [Mutation Options](https://www.apollographql.com/docs/react/data/mutations/)
