'use strict'

//imports 
const express = require('express')
const models = require('../../models')
const adminRoute = express.Router()
const isAuth = require('../../auth/middelWares/BearerToken')
const { deal, user, claimed, dealsModel, usersModel } = require('../../models')
const isAdmin = require('../../auth/middelWares/admin')


// get all users 
adminRoute.get('/users', isAuth, isAdmin, async (req, res) => {
    try {
        const findUsers = await user.getUsers();
        if (findUsers) {
            res.status(200).json(findUsers);
        } else {
            res.status(404).json('no users yet');
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});


// get one users 
adminRoute.get('/users/:id', isAuth, async (req, res) => {
    try {
        const id = req.params.id
        const findUsers = await user.read(id);
        if (findUsers) {
            res.status(200).json(findUsers);
        } else {
            res.status(404).json('no users yet');
        }
    } catch (e) {
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
            console.log(addDeal);
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
            await deal.deleteID(id);
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
            const updateUser = await user.update(id, body);
            res.status(200).json(updateUser);
        } else {
            res.status(400).json('Invalid request - missing request body');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

// delete one user data 
adminRoute.delete('/user/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const id = req.params.id
        if (body) {
            const updateUser = await user.delete(id);
            res.status(204).json('deleted');
        } else {
            res.status(400).json('Invalid request - missing request body');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});


// delete multiple users 
adminRoute.delete('/user', async (req, res) => {
    try {
        const userIdsToDelete = req.body.userID; // Assuming you send an array of user IDs in the request body
        console.log(userIdsToDelete);
        if (userIdsToDelete && Array.isArray(userIdsToDelete) && userIdsToDelete.length > 0) {
            // Assuming user.delete is a function that deletes users by ID
            const deletePromises = userIdsToDelete.map(id => user.deleteID(id));
            await Promise.all(deletePromises); // Wait for all delete operations to complete
            res.status(204).json('Users deleted');
        } else {
            res.status(400).json('Invalid request - missing or invalid user IDs');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

// delete multiple deals 
adminRoute.delete('/deals', async (req, res) => {
    try {
        const userIdsToDelete = req.body.userID; // Assuming you send an array of user IDs in the request body
        if (userIdsToDelete && Array.isArray(userIdsToDelete) && userIdsToDelete.length > 0) {
            // Assuming user.delete is a function that deletes users by ID
            const deletePromises = userIdsToDelete.map(id => deal.deleteID(id));
            await Promise.all(deletePromises); // Wait for all delete operations to complete
            res.status(204).json('Users deleted');
        } else {
            res.status(400).json('Invalid request - missing or invalid user IDs');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});

// GET ALL CLAIMED
adminRoute.get('/allclaimed', isAuth, isAdmin, async (req, res) => {
    try {
        const findDeal = await claimed.getAll(dealsModel, usersModel);
        if (findDeal) {
            res.status(200).json(findDeal);
        } else {
            res.status(404).json('Error while finding the deals');
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
});

module.exports = adminRoute