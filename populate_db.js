import dotenv from "dotenv";
import { Client } from "pg";


dotenv.config();


const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT NOT NULL,
  username VARCHAR(255),
  added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO messages (text, username)
VALUES ('Hello there!', 'Obi-Wan Kenobi'),
('General Kenobi...', 'General Grievous');
`;


async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
main();
