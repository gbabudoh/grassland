import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  console.log('--- STARTING MIGRATION ---');
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const sql = postgres(process.env.DATABASE_URL);
  const migrationPath = path.join(__dirname, '..', 'drizzle', '0000_lame_banshee.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error('ERROR: Migration file not found at', migrationPath);
    process.exit(1);
  }

  console.log('Reading migration from:', migrationPath);
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');
  const statements = migrationSql.split('--> statement-breakpoint');

  console.log(`Executing ${statements.length} statements...`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i].trim();
    if (statement) {
      try {
        process.stdout.write(`Executing statement ${i + 1}/${statements.length}... `);
        await sql.unsafe(statement);
        console.log('✅');
      } catch (err) {
        if (err.message.includes('already exists')) {
            console.log('ℹ️ (Skipped: Already exists)');
        } else {
            console.log('❌');
            console.error('ERROR details:', err.message);
            // We continue for now to try to apply as much as possible, 
            // but in production we'd want to rollback or stop.
        }
      }
    }
  }

  console.log('--- MIGRATION PROCESS FINISHED ---');
  await sql.end();
  process.exit(0);
}

migrate().catch(err => {
    console.error('FATAL ERROR:', err);
    process.exit(1);
});
