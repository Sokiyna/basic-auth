
'use strict';

const express = require('express'); 
const router = express.Router();
const basic = require('./ middleware/basic');
const usersModel = require('./models/users-model');
const bcrypt = require ('bcrypt');
const base64 = require('base-64');




router.post('/signin', basic, (req, res)=>{
    res.status(200).json(req.body.user);
});

router.post('/signup', async (req, res)=>{
    try{
        req.body.passowrd = await bcrypt.hash(req.body.password, 5);
        const user = new usersModel(req.body);
        const record = await user.save(req.body);
        res.status(201).json(record);
        
    }catch(e){
        res.status(403).send("Error Creating User");
    }
});

module.exports = router;
