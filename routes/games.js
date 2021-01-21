const _ = require('lodash');
const { Game, validateGame, getHighestScores } = require('../models/game');
const { User, validateUser } = require('../models/user');
const db = require('../config/db');

const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // validate the request first
    const { error } = validateGame(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
        // pick values of those keys from the body (lodash)
        game = new Game(_.pick(req.body, ['username', 'score']));
        await game.save();

        // send result
        return res.status(200).send(_.pick(game, ['_id', 'username', 'score']));
    } else {
        return res.status(400).send('Could not save score - such user does not exist!');
    }
});

router.get('/scores', async (req, res) => {
    // JSON of higest scores for each player
    var col = db.dbObj.collection('games').aggregate(   
        {     
            $group: {_id: '$username', "score": {$max:"$score"}} 
        },
        { 
            $addFields: { "username": "$_id" }
        },
        {
            $project: { _id: false }
        }
        ).toArray(function(err, scores) {
      res.send(scores);
    });
});

module.exports = router;
