import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Simple JSON-file storage for orders and form submissions, written to
// /data in the project root. Good for local use and a single small server;
// swap for a database (or an email/WhatsApp notification) before deploying
// to serverless hosting, where the filesystem is not persistent.

const DATA_DIR = path.join(process.cwd(), "data");
const queues = new Map<string, Promise<unknown>>();

export type Collection = "orders" | "custom-orders" | "enquiries";

export function newId(prefix: string) {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `${prefix}-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export function appendRecord(collection: Collection, record: object) {
  const file = path.join(DATA_DIR, `${collection}.json`);
  // Serialise writes per file so concurrent requests don't clobber each other.
  const previous = queues.get(file) ?? Promise.resolve();
  const next = previous.catch(() => {}).then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await readFile(file, "utf8"));
    } catch {
      existing = [];
    }
    existing.push(record);
    await writeFile(file, JSON.stringify(existing, null, 2));
  }).catch((error) => {
    // Serverless hosts like Vercel have a read-only filesystem. Keep the
    // record in the server logs instead of failing the customer's request.
    console.error(`[${collection}] could not save to ${file}`, error);
    console.log(`[${collection}] ${JSON.stringify(record)}`);
  });
  queues.set(file, next);
  return next;
}
