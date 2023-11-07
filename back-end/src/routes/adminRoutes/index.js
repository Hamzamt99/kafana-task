'use strict'

//imports 
const express = require('express')
const models = require('../../models')
const adminRoute = express.Router()
const isAuth = require('../../auth/middelWares/BearerToken')
const { deal } = require('../../models')
const isAdmin = require('../../auth/middelWares/admin')

// add new deal route 
adminRoute.post('/deal', isAuth, isAdmin, async (req, res) => {
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
adminRoute.get('/deal/:id', async (req, res) => {
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
adminRoute.get('/deals', async (req, res) => {
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
adminRoute.patch('/deal/:id', isAuth, isAdmin, async (req, res) => {
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
adminRoute.delete('/deal/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            await deal.deleteDeal(id);
            res.status(204).json('deleted');
        } else {
            res.status(400).json('Invalid request');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});


// update user data 
adminRoute.patch('/user/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        if (body) {
            const updateUser = await models.user.update(id, body);
            res.status(200).json(updateUser);
        } else {
            res.status(400).json('Invalid request - missing request body');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

module.exports = adminRoute