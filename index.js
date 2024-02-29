// imports here for express and pg
const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_icecream_db')
const app = express()

// static routes here (you only need these for deployment)

// app routes here

// create your init function
const init = async () => {
    await client.connect();
    console.log('connected to database');
    let SQL = `
        DROP TABLE IF EXISTS flavors;
        
        CREATE TABLE flavors(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            is_favorite BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        )
    `;
    await client.query(SQL);
    console.log('tables created');
    SQL = ` `;
    await client.query(SQL);
    console.log('data seeded');
  };
// init function invocation
init();
