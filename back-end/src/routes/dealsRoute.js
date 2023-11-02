'use strict'

//imports 
const express = require('express')
const models = require('../models')
const dealsRoute = express.Router()
const isAuth = require('../auth/middelWares/BearerToken')
const { deal } = require('../models')


// add new deal route 
dealsRoute.post('/deal', async (req, res) => {
    try {
        const body = req.body;
        if (body) {
            const addDeal = await deal.create(body);
            res.status(201).json(addDeal);
        } else {
            res.status(400).json('Invalid request - missing request body');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

// get one deal 
dealsRoute.get('/deal/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const findDeal = await deal.read(id);
            if (findDeal) {
                res.status(200).json(findDeal);
            } else {
                res.status(404).json('Deal not found');
            }
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});

// get all deals 
dealsRoute.get('/deals', async (req, res) => {
    try {
        const findDeal = await deal.read();
        if (findDeal) {
            res.status(200).json(findDeal);
        } else {
            res.status(404).json('Error while finding the deals');
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});

// update deal
dealsRoute.patch('/deal/:id', async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        if (body) {
            const addDeal = await deal.update(id, body);
            res.status(200).json(addDeal);
        } else {
            res.status(400).json('Invalid request - missing request body');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

// remove deal 
dealsRoute.delete('/deal/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            await deal.delete(id);
            res.status(204).json('deleted');
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

module.exports = dealsRoute