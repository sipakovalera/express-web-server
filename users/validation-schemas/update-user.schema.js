const Joi = require('joi');

const updateUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        

    token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    login: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

    module.exports = updateUserSchema;
