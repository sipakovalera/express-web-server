const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    login: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})
    .with('name', 'birth_year')
    .with('password', 'login');

    module.exports = createUserSchema;
