// server/reset.js
import 'dotenv/config'; // loads your .env
import { pool } from './database.js'  // make sure your database.js exports pool

const resetTable = async () => {
  console.log('DB name:', process.env.PGDATABASE)

  try {
    // Drop the table if it exists
    await pool.query('DROP TABLE IF EXISTS items')

    // Create the table with features
    await pool.query(`
      CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        base_price NUMERIC NOT NULL,
        total_price NUMERIC NOT NULL,
        exterior VARCHAR(50),
        wheels VARCHAR(50)
      )
    `)

    // Insert sample data
    await pool.query(`
      INSERT INTO items (name, base_price, total_price, exterior, wheels) VALUES
      ('Tesla Model S', 79999, 81999, 'Red', 'Sport'),
      ('Ford Mustang', 55999, 56999, 'Blue', 'Classic'),
      ('Chevy Camaro', 42999, 44499, 'Black', 'Premium')
    `)

    console.log('✅ items table has been reset and sample data inserted!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error resetting table:', err)
    process.exit(1)
  }
}

resetTable()