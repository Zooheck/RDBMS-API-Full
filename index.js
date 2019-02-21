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

server.get('/api/cohorts/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts')
        .where({id: req.params.id })
        .first()
        res.status(200).json(cohort)
    } catch (error) {
        res.status(500).json(error)
    }
});

server.post('/api/cohorts', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);
        const cohort = await db('cohorts')
            .where({id})
            .first()
        res.status(201).json(cohort)
    } catch (error) {
        res.status(500).json(err)
    }
});

server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .update(req.body)
        if (count > 0) {
            const cohort = await db('cohorts')
                .where({ id: req.params.id })
                .first()
            res.status(200).json(cohort)
        } else {
            res.status(404).json({message: 'Cohort not found'})
          }
    } catch (error) {
        res.status(500).json(err)
    }
});

server.delete('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .del()
        if (count > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({message: 'Cohort not found'})
          }
    } catch (error) {
        res.status(500).json(error)
    }
});
server.listen(4000, () => {
    console.log('server listening on port 4000')
})