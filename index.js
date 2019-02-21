const express = require('express');
const helmet = require('helmet');
const knex = require('knex')


const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}


const db = knex(knexConfig);


const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json(error)
    }
});
server.listen(4000, () => {
    console.log('server listening on port 4000')
})