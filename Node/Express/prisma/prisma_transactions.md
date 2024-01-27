# Prisma Transactions examples

## Nested writes
perform a single Prisma Client API call with multiple operations that touch multiple related records.
For example, creating a user together with a post or updating an order together with an invoice. 
Prisma Client ensures that all operations succeed or fail as a whole.

```typescript
// Create a new user with two posts in a
// single transaction
const newUser: User = await prisma.user.create({
  data: {
    email: 'alice@prisma.io',
    posts: {
      create: [
        { title: 'Join the Prisma Slack on https://slack.prisma.io' },
        { title: 'Follow @prisma on Twitter' },
      ],
    },
  },
})

// Change the author of a post in a single transaction
const updatedPost: Post = await prisma.post.update({
  where: { id: 42 },
  data: {
    author: {
      connect: { email: 'alice@prisma.io' },
    },
  },
})
```

## Batch/bulk operations
Following bulk operations run as transactions from Prisma Client

- deleteMany()
- updateMany()
- createMany()

## $transaction API
### Sequential Prisma Client operations

```typescript
const [posts, totalPosts] = await prisma.$transaction([
  prisma.post.findMany({ where: { title: { contains: 'prisma' } } }),
  prisma.post.count(),
])

const [userList, updateUser] = await prisma.$transaction([
  prisma.$queryRaw`SELECT 'title' FROM User`,
  prisma.$executeRaw`UPDATE User SET name = 'Hello' WHERE id = 2;`,
])

// From version 4.4.0
// isolationLevel: Sets the transaction isolation level. 
//By default this is set to the value currently configured in your database.
await prisma.$transaction(
  [
    prisma.resource.deleteMany({ where: { name: 'name' } }),
    prisma.resource.createMany({ data }),
  ],
  {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
  }
)
```

## Interactive transactions
When you need more control over what queries execute within a transaction.
To use interactive transactions, you can pass an async function into $transaction.
The first argument passed into this async function is an instance of Prisma Client

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function transfer(from: string, to: string, amount: number) {
  return prisma.$transaction(async (tx) => {
    // 1. Decrement amount from the sender.
    const sender = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        email: from,
      },
    })

    // 2. Verify that the sender's balance didn't go below zero.
    if (sender.balance < 0) {
      throw new Error(`${from} doesn't have enough to send ${amount}`)
    }

    // 3. Increment the recipient's balance by amount
    const recipient = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        email: to,
      },
    })

    return recipient
  })
}

async function main() {
  // This transfer is successful
  await transfer('alice@prisma.io', 'bob@prisma.io', 100)
  // This transfer fails because Alice doesn't have enough funds in her account
  await transfer('alice@prisma.io', 'bob@prisma.io', 100)
}
```