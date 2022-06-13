const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const checkLogin = require('../middlewares/checkLogin');
const {getQuestions, saveQuestion} = require('../controllers/questionController');

router.get('/', (req, res) => {
    Question.find({ status: 'active'}, (err, data) => {
        if(err){
            res.status(500).json({
                error: 'internal server error!'
            })
        }else{
            res.status(200).json({
                result: data,
            })
        }
    })
});

router.get('/questions-with-author', (req, res) => {
    getQuestions(req, res);
});

router.post('/', async (req, res) => {
    saveQuestion(req, res);
});

module.exports = router;