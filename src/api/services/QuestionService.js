const Question = require('../models/Question');

const getQuestionsService = async (req, res) => {
    await Question.find({ status: 'active'}).populate("author", "-_id -__v -questions -status").select({
        _id: 0,
        date: 0,
        __v: 0
    }).exec((err, data) => {
        if(err){
            res.status(500).json({
                error: 'internal server error!'
            })
        }else{
            // return {
            //     questions: data
            // };
            res.status(200).json({
                result: data,
            })
        }
    });
}

const saveQuestionService = async (req, res) => {
    try {
        const newQuestion = new Question({
            ...req.body,
            user: req.authorId
        });

        const question = await newQuestion.save();

        await Author.updateOne({
            _id: req.authorId
        },{
            $push: {
                questions: question._id
            }
        });

        return;
        
    } catch (error) {
        res.status(500).json({
            error,
            message: 'server error!'
        });
    }
}

module.exports = {
    getQuestionsService,
    saveQuestionService
}