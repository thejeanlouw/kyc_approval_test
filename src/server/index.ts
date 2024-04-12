import { router, publicProcedure } from './trpc';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { documents } from '@/db/schema';

const pool = new Pool({
  connectionString: 'postgres://drizzle:drizzle@localhost:5432/kyc_db',
});

const db = drizzle(pool);

migrate(db, { migrationsFolder: 'drizzle' });

export const appRouter = router({
  getDocuments: publicProcedure.query(async () => {
    return await db.select().from(documents).execute();
  }),
  // Upload document to OneDrive and capture metadata
  addDocument: publicProcedure.input(z.object({
    name: z.string(),
    webUrl: z.string(),
    createdDateTime: z.string(),
    lastModifiedDateTime: z.string(),
    createdByUser: z.string(),
    lastModifiedByUser: z.string(),
    size: z.number(),
    file: z.string(),
    folder: z.string(),
    metadata: z.string(),
    documentId: z.string(),
  })).mutation(async (input) => {
    // first check latest id
    let maxVal = 0;
    const latestId = (await db.select().from(documents)).sort(
        (a, b) => (a.id as number) - (b.id as number)
    ).pop();
    console.log('latestId', latestId);
    // if no latest id,
    if (latestId)
        maxVal = latestId.id as number;

    console.log('maxVal', maxVal);
    console.log('input.input', input.input);
    
    await db.insert(documents).values({ 
      ...input,
      ...input.input,
      id: maxVal + 1,
      documentId: input.input.documentId+1,
    }).execute();
  }),
  deleteDocument: publicProcedure.input(z.object({
    id: z.number(),
  })).mutation(async (input) => {

    console.log('input.input', input.input);
    await db.delete(documents).where(eq(documents.id, input.input.id)).execute();  
  }),
});

export type AppRouter = typeof appRouter;