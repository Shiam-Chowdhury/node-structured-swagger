const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const Author = require('../models/Author');

const signupService = async (req, res) => {  
    try {
        //hashing the requested password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //creating new user
        const newAuthor = new Author({
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });
        await newAuthor.save();

        return;
    } catch(err) {
        res.status(500).json({
            message: 'signup failed!',
            err
        });
    }
}

const signinService = async (req, res) => {  
    const author = await Author.findOne({ email: req.body.email});

    if(author){
        const isValidPassword = await bcrypt.compare(req.body.password, author.password);

        try {
            if(isValidPassword){
                const token = jwt.sign({
                    email: req.body.email,
                    authorId: author._id
                },process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
    
                
            }else{
                res.status(401).json({
                    message: 'login failed!',
                });
            }  
        } catch (error) {
            res.status(500).json({
                message: 'signin failed!',
                error
            });
        }

    }
}

const getAllAuthorsService = async (req, res) => {  
    try {
        const authors = await Author.find({
            status: 'active'
        }).populate('questions').select({
            __v: 0
        });

        return {
            authors: authors
        };

        // res.status(200).json({
        //     authors
        // });
    } catch (error) {
        res.status(404).json({
            error,
            message: 'not found!',
        });
    }
}

module.exports = {
    signupService,
    signinService,
    getAllAuthorsService
}