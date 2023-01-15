
const asyncHandler = require('express-async-handler')
const Experience = require('../models/experience')

const post = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { departure, arrival, transportation, time, duration, crowded, observations, satisfaction } = req.body;

    if (!departure)
        throw new Error('Campul departure lipseste din corpul cererii!');

    if (!arrival)
        throw new Error('Campul arrival lipseste din corpul cererii!');

    if (!transportation)
        throw new Error('Campul transportation lipseste din corpul cererii!');

    if (!time)
        throw new Error('Campul time lipseste din corpul cererii!');

    if (!duration)
        throw new Error('Campul duration lipseste din corpul cererii!');

    if (!crowded)
        throw new Error('Campul crowded lipseste din corpul cererii!');

    if (!observations)
        throw new Error('Campul observations lipseste din corpul cererii!');

    if (!satisfaction)
        throw new Error('Campul satisfaction lipseste din corpul cererii!');

    const newExperience = new Experience({ departure, arrival, transportation, time, duration, crowded, observations, satisfaction });

    await newExperience.save();

    res.json({ message: `Experienta a fost creata cu succes!`, severity: 'success'})
})

const getAll = asyncHandler(async (_req, res) => {
    res.json(await Experience.find({}, { __v: 0 }));
})

module.exports = { post, getAll }