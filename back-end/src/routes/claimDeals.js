'use strict'

//imports 
const express = require('express')
const claimedRoute = express.Router()
const isAuth = require('../auth/middelWares/BearerToken')
const { claimed, dealsModel } = require('../models')


// add new deal route 
claimedRoute.post('/claim', isAuth, async (req, res) => {
    try {
        const body = req.body;
        const id = req.users.userID
        if (body) {
            body.User_ID = id
            const addDeal = await claimed.create(body);
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
claimedRoute.get('/claim/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const findDeal = await claimed.getRelation(id, dealsModel);
            if (findDeal) {
                res.status(200).json(findDeal);
            } else {
                res.status(404).json('not found');
            }
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});

// get user deals
claimedRoute.get('/claim', isAuth, async (req, res) => {
    try {
        const id = req.users.userID;
        if (id) {
            const findDeal = await claimed.getRelation(id, dealsModel);
            if (findDeal) {
                res.status(200).json(findDeal);
            } else {
                res.status(200).json('no deals found');
            }
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});


// remove claim 
claimedRoute.delete('/claim/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            await claimed.delete(id);
            res.status(204).json('deleted');
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

module.exports = claimedRoute