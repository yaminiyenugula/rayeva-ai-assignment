require('dotenv').config();
const mysql = require('mysql2/promise');

const setupDatabase = async () => {
  try {
    // Connect without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    console.log('Connected to MySQL Server');

    // Create database if not exists
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );
    console.log(`Database '${process.env.DB_NAME}' created or already exists`);

    await connection.end();
    console.log('Setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during setup:', error.message);
    process.exit(1);
  }
};

setupDatabase();
