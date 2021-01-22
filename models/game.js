const Joi = require('joi');
const mongoose = require('mongoose');
// const db = require('../config/db');
 
const gameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    score: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 5
    }
});

// create game model
const Game = mongoose.model('Game', gameSchema);
 
function validateGame(game) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        score: Joi.number().min(0).max(30000).required()
    });

    return schema.validate(game);
}

exports.Game = Game;
exports.validateGame = validateGame;