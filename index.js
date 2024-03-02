// imports here for express and pg
const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_icecream_db')
const app = express()

// app routes here
// parse the body into JS Objects
app.use(express.json())

// Log the requests as they come in
app.use(require('morgan')('dev'))

// Returns array of flavors sorted by favorites
app.get('/api/flavors', async (req, res, next) => {
    try {
        const SQL = `
            SELECT * from flavors ORDER BY is_favorite DESC;
        `
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch (ex) {
        next(ex)
    }
})

// Returns 1 flavor by id
app.get('/api/flavors/:id', async (req, res, next) => {
    try {
        const SQL = `
          SELECT * from flavors WHERE id=$1;
        `
        const response = await client.query(SQL, [req.params.id]);
        if (response.rows.length === 0) {
            return res.status(404).send("Flavor not found");
        }
        res.send(response.rows[0])
    } catch (ex) {
        next(ex)
    }
})

// Create flavors
app.post('/api/flavors', async (req, res, next) => {
    try {
        const SQL = `
            INSERT INTO flavors(name, is_favorite)
            VALUES($1, $2)
            RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.is_favorite])
        res.send(response.rows[0])
    } catch (ex) {
        next(ex)
    }
})

// Update flavors
app.put('/api/flavors/:id', async (req, res, next) => {
    try {
        const SQL = `
            UPDATE flavors
            SET name=$1, is_favorite=$2, updated_at= now()
            WHERE id=$3 RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.is_favorite, req.params.id])
        res.send(response.rows[0])
    } catch (ex) {
        next(ex)
    }
})

// Delete flavors
app.delete('/api/flavors/:id', async (req, res, next) => {
    try {
        const SQL = `
            DELETE from flavors
            WHERE id = $1
        `
        const response = await client.query(SQL, [req.params.id])
        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})


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
    SQL = `
        INSERT INTO flavors(name, is_favorite) VALUES('vanilla', false);
        INSERT INTO flavors(name, is_favorite) VALUES('mint', false);
        INSERT INTO flavors(name, is_favorite) VALUES('cookies and cream', true);
    `;
    await client.query(SQL);
    console.log('data seeded');
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`listening on port ${port}`))
};
// init function invocation
init();
