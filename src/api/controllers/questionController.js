const Question = require('../models/Question');
const {getQuestionsService, saveQuestionService} = require('../services/QuestionService');

const getQuestions = async (req, res) => {
    try{
        const questions = await getQuestionsService(req, res);
        // res.status(200).json({
        //     questions
        // })
    }catch(err){
        res.status(500).json({
            error: 'internal server error!',
            err
        })
    }
}

const saveQuestion = async (req, res) => {
    try {
        await saveQuestionService(res, req);

        res.status(200).json({
            message: 'question created successfully'
        });
        
    } catch (error) {
        res.status(500).json({
            error,
            message: 'server error!'
        });
    }
}

module.exports = {
    getQuestions,
    saveQuestion
}