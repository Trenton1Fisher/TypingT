import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({
  url: 'libsql://typing-t-trenton1fisher.turso.io',
  authToken:
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTI3VDA5OjM4OjA2LjgxODkwNTEzNVoiLCJpZCI6IjJkNzYxNTVhLWJjOWItMTFlZS04MDExLWE2N2RmZTcyZDc0ZCJ9.Oy85l9lrKj6JNBpWXBPaM2IwnmltyLGsazCAgnf8MFjMIO42WCsUEzLoaMCQKQvWNwXPZRnEqjuBXajSflz9DA',
})

export const db = drizzle(client, { schema })
