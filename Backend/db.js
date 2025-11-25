import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'app',
  password: 'app', // TODO: move to environment variables
  database: 'app',
  waitForConnections: true,
  connectionLimit: 10
});

// Initialize tables
async function initDB() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(500) NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS outfits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        top_id INT,
        bottom_id INT,
        shoes_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database init error:', error);
  } finally {
    connection.release();
  }
}

initDB();

export default pool;
