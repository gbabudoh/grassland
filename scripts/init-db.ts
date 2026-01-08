import postgres from "postgres";

const createDb = async () => {
  const adminUrl = "postgresql://postgres:LetMeGetaces232823@109.205.181.195:5432/postgres";
  const sql = postgres(adminUrl);

  try {
    console.log("Checking if database 'grassland' exists...");
    const result = await sql`SELECT 1 FROM pg_database WHERE datname = 'grassland'`;
    
    if (result.length === 0) {
      console.log("Creating database 'grassland'...");
      await sql`CREATE DATABASE grassland`;
      console.log("Database created successfully.");
    } else {
      console.log("Database 'grassland' already exists.");
    }
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await sql.end();
  }
};

createDb();
