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


server.listen(4000, () => {
    console.log('server listening on port 4000')
})