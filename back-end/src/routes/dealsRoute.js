'use strict'

//imports 
const express = require('express')
const dealsRoute = express.Router()
const isAuth = require('../auth/middelWares/BearerToken')
const { deal } = require('../models')
const { uploadProfile, profileUpload } = require('../auth/middelWares/multer')
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
dealsRoute.get('/deals', isAuth, async (req, res) => {
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


// add new deal route 
dealsRoute.post('/deal', isAuth, profileUpload.single('image'), uploadProfile, async (req, res) => {
    try {
        const body = req.body;
        if (body) {
            body.image = req.image
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


module.exports = dealsRoute