const express = require('express');
const router = express.Router();
const {signin, signup, getAllAuthors} = require('../controllers/authorController');

router.post('/signup', async (req, res) => {
    signup(req, res);
});

router.post('/signin', async (req,res) => {
    signin(req, res);
});

router.get('/all', async (req, res) => {
    getAllAuthors(req, res);
});

module.exports = router;