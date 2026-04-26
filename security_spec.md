# Security Specification

## Data Invariants
- A user document must have a `role` that is one of: 'user', 'seller', 'influencer'.
- A user can only read and write their own document in the `/users` collection.
- `uid` field in the user document must match the document ID.
- `phoneNumber` and `role` are immutable after creation.
- `createdAt` must be set by the server.

## The Dirty Dozen Payloads (Target: /users/{userId})
1. Create a user document with `role: 'admin'`. (REJECT)
2. Create a user document with a different `uid` than the document ID. (REJECT)
3. Create a user document as an unauthenticated user. (REJECT)
4. Update a user document's `role` after creation. (REJECT)
5. Update another user's document. (REJECT)
6. Read another user's document. (REJECT)
7. List all users without filtering by `uid`. (REJECT)
8. Create a user document with a name longer than 100 characters. (REJECT)
9. Create a user document with a non-string `phoneNumber`. (REJECT)
10. Delete a user document. (REJECT)
11. Update `createdAt` field. (REJECT)
12. Create a user document with a missing `role` field. (REJECT)

## The Test Runner (firestore.rules.test.ts)
(Logic omitted for brevity, focus on rules generation)
