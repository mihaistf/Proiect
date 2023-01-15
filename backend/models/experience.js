const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const experienceSchema = new Schema(
    {
        departure: {
            type: String,
            required: true,
            trim: true
        },
        arrival: {
            type: String,
            required: true,
            trim: true
        },
        transportation: {
            type: String,
            required: true,
            trim: true
        },
        time: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        crowded: {
            type: String,
            required: true
        },
        observations: {
            type: String,
            required: true
        },
        satisfaction: {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;