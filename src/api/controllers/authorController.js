const {signupService, signinService, getAllAuthorsService} = require('../services/AuthorService');

const signup = async (req, res) => {  
    try{
        await signupService(req, res);

        res.status(200).json({
            message: 'signup successfull!'
        });
    }catch(err){
        res.status(500).json({
            message: 'signup failed!',
            err
        });
    }
    
}

const signin = async (req, res) => { 
    try{
        await signinService(req, res);
        res.status(200).json({
            token,
            message: 'login successfull'
        });
    }catch (e){
        res.status(500).json({
            message: 'signin failed!',
            e
        });
    }
}

const getAllAuthors = async (req, res) => {
    try{
        let authors = await getAllAuthorsService(req, res);
        res.status(200).json({
            authors
        });
    }catch (e){
        res.status(404).json({
            error,
            message: 'not found!',
        });
    }
}

module.exports = {
    signup,
    signin,
    getAllAuthors
}