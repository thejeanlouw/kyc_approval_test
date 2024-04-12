import { integer, pgTable, text } from 'drizzle-orm/pg-core';

// Define documents table that keep track of fetching, modifying, creating, deleting and updating OneDrive documents
export const documents = pgTable('documents', {
    id: integer("id").primaryKey(),
    documentId: text("document_id").unique(),
    name: text("name"),
    webUrl: text("web_url"),
    createdDateTime: text("created_date_time"),
    lastModifiedDateTime: text("last_modified_date_time"),
    createdByUser: text("created_by_user"),
    lastModifiedByUser: text("last_modified_by_user"),
    size: integer("size"),
    file: text("file"),
    folder: text("folder"),
    metadata: text("metadata"),
});