import Joi from 'joi';

export const superheroSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Nickname should be a string',
    'string.min': 'Nickname should have at least {#limit} characters',
    'string.max': 'Nickname should have at most {#limit} characters',
    'any.required': 'Nickname is required',
  }),
  real_name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Real name should be a string',
    'string.min': 'Real name should have at least {#limit} characters',
    'string.max': 'Real name should have at most {#limit} characters',
    'any.required': 'Real name is required',
  }),
  origin_description: Joi.string().min(10).max(500).required().messages({
    'string.base': 'Origin description should be a string',
    'string.min': 'Origin description should have at least {#limit} characters',
    'string.max': 'Origin description should have at most {#limit} characters',
    'any.required': 'Origin description is required',
  }),
  superpowers: Joi.string().min(5).max(200).required().messages({
    'string.base': 'Superpowers should be a string',
    'string.min': 'Superpowers should have at least {#limit} characters',
    'string.max': 'Superpowers should have at most {#limit} characters',
    'any.required': 'Superpowers are required',
  }),
  catch_phrase: Joi.string().min(5).max(200).required().messages({
    'string.base': 'Catch phrase should be a string',
    'string.min': 'Catch phrase should have at least {#limit} characters',
    'string.max': 'Catch phrase should have at most {#limit} characters',
    'any.required': 'Catch phrase is required',
  }),
  images: Joi.array().items(Joi.string().uri()).messages({
    'array.base': 'Images should be an array of URLs',
    'string.uri': 'Each image should be a valid URL',
  }),
});
