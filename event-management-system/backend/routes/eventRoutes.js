const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// CRUD Operations
router.post('/', async (req, res) => {
    const { name, date, location, description } = req.body;
    const newEvent = new Event({ name, date, location, description });
    await newEvent.save();
    res.status(201).json(newEvent);
});

router.get('/', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

router.put('/:id', async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
});

router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;