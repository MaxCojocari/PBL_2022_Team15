const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post("/signup", async (req, res) => {
    // User.find({email: req.body.email})
    //     .exec()
    //     .then(user => {
    //         if (user.length >= 1) {            
    //             return res.status(409).json({
    //                 message: 'Email exists'
    //             });
    //         } else { })
    const { error } = validateUser(req.body);
    if (error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    }
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            // 500 Internal Server Error
            return res.status(500).json({
                error: err
            })
        } else {
            const signedUpUser = {
                _id: new mongoose.Types.ObjectId(),
                surname: req.body.surname,
                name: req.body.name,
                email: req.body.email,
                password: hash
            };
            res.send(signedUpUser);
        }
    })              
});

router.delete("/:userId", (req, res) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            // 200 OK
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            // 500 Internal Server Error
            res.status(500).json({
                error: err
            });
        });
})

router.post("/login", (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length === 0) {
            return res.status(401).json({
            message: "Authentication failed"
            });
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                // 401 Unauthorized
                return res.status(401).json({
                message: "Authentication failed"
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                // 200 OK
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
            }
            // 401 Unauthorized
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

const validateUser = (user) => {
    const schema = Joi.object({
        _id: Joi.string(),
        surname: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9@$!%*#?&.]{8,50}$'))
    })

    return schema.validate(user);
}

module.exports = router;