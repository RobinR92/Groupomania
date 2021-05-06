const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../models');

exports.signup = (req, res, next) => {
    // Checks if the password is 8 characters long and contains a lowercase, an uppercase, a number and a special character
    if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(req.body.password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir minimum 8 caractères avec au minimum un caractère minuscule et majuscule, un chiffre et un caractère spécial !@#$%^&*' })
    }

    // Hash the user's password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Create a new User and save it to the database
            db.User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
            })
                .then(user => {
                    res.status(201).json({
                        token: jwt.sign(
                            {
                                userId: user.id,
                                roles: user.roles,
                            },
                            process.env.JWT_SECRET_TOKEN,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // Checks if the searched user exists
            if (!user) {
                return res.status(401).json({ error: 'Informations d\'identification invalides' })
            }

            // Compare the password of the recovered user with the password entered in the login form
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (!isValid) {
                        return res.status(401).json({ error: 'Informations d\'identification invalides' })
                    }

                    res.status(200).json({
                        token: jwt.sign(
                            {
                                userId: user.id,
                                roles: user.roles,
                            },
                            process.env.JWT_SECRET_TOKEN,
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
};

exports.getCurrentUser = (req, res, next) => {
    db.User.findOne({ where: { id: res.locals.userId } })
        .then(user => {
            return res.status(200).json({
                username: user.username,
                roles: user.roles
            });
        })
        .catch(error => res.status(500).json({ error }))
}
