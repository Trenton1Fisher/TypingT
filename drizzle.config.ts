import { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: 'libsql://typing-t-trenton1fisher.turso.io',
    authToken:
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTI3VDA5OjM4OjA2LjgxODkwNTEzNVoiLCJpZCI6IjJkNzYxNTVhLWJjOWItMTFlZS04MDExLWE2N2RmZTcyZDc0ZCJ9.Oy85l9lrKj6JNBpWXBPaM2IwnmltyLGsazCAgnf8MFjMIO42WCsUEzLoaMCQKQvWNwXPZRnEqjuBXajSflz9DA',
  },
  out: './drizzle',
} satisfies Config
