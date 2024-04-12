CREATE TABLE IF NOT EXISTS "documents" (
	"id" integer PRIMARY KEY NOT NULL,
	"document_id" text,
	"name" text,
	"web_url" text,
	"created_date_time" text,
	"last_modified_date_time" text,
	"created_by_user" text,
	"last_modified_by_user" text,
	"size" integer,
	"file" text,
	"folder" text,
	"metadata" text,
	CONSTRAINT "documents_document_id_unique" UNIQUE("document_id")
);
