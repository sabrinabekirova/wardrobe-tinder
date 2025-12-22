import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'app',
  password: 'app',
  database: 'app',
  waitForConnections: true,
  connectionLimit: 10
});

async function init_db() {
  const connection = await pool.getConnection();
  try {
    await connection.query('DROP TABLE IF EXISTS outfits');
    await connection.query('DROP TABLE IF EXISTS items');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        google_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS outfits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(100),
        top_id INT,
        bottom_id INT,
        accessory_id INT,
        other_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (top_id) REFERENCES items(id) ON DELETE SET NULL,
        FOREIGN KEY (bottom_id) REFERENCES items(id) ON DELETE SET NULL,
        FOREIGN KEY (accessory_id) REFERENCES items(id) ON DELETE SET NULL,
        FOREIGN KEY (other_id) REFERENCES items(id) ON DELETE SET NULL
      )
    `);
    
  } catch (error) {
  } finally {
    connection.release();
  }
}

init_db();

export default pool;
