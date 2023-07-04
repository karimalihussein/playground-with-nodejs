const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
    validateStore,
    validateUpdate,
} = require("../validations/UserValidation");
const { User } = require("../models/User");
