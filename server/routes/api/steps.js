const express = require('express');
const router = express.Router();

const Steps = require('../../models/Steps');


// @route   GET api/steps
// @desc    get all phases/steps
// @access  Public
router.get('/', async (req, res) => {
    try {
        const list = await Steps.find();
        if (list.length === 0) {
            return res.status(400).json({ msg: 'No Steps found' });
        }

        res.json(list)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
});

// @route   POST api/steps/Phase
// @desc    add/edit phase
router.post('/Phase', async (req, res) => {
    const { stepname, id } = req.body;
    let entry;

    if (!id) { // create
        entry = new Steps({
            stepname,
        })
    }
    else { // modify
        entry = await Steps.findById(id)
        entry.stepname = stepname;
    }

    await entry.save();
    res.send(entry)
});

// @route   POST api/steps/Step
// @desc    add/edit Step
router.post('/Step', async (req, res) => {
    const { step, id, stepid } = req.body;

    const entry = await Steps.findById(id)

    if (!id || !entry)
        return res.status(400).json({ msg: 'Step not found' });

    if (!stepid) {  // create
        entry.steps.push({
            step
        })
    }
    else { // modify
        const innerstep = entry.steps.find(step => step.id.toString() === stepid)
        innerstep.step = step;
    }

    await entry.save();
    res.send(entry)
});

// @route   DELETE api/steps/Phase
// @desc    delete Phase
router.delete('/Phase', async (req, res) => {
    const { id } = req.body;
    const entry = await Steps.findById(id)

    if (!entry)
        return res.status(400).json({ msg: 'Step not found' });

    await entry.delete();
    res.send("ok")
});

// @route   DELETE api/steps/Step
// @desc    delete Step
router.delete('/Step', async (req, res) => {
    const { id, stepid } = req.body;
    const entry = await Steps.findById(id);

    if (!id || !entry)
        return res.status(400).json({ msg: 'Step not found' });

    const inner_array = entry.steps.filter(step => {
        return step.id.toString() !== stepid;
    });

    entry.steps = inner_array

    await entry.save();
    res.send("ok")
});


module.exports = router;