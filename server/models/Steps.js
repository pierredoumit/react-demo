const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepSchema = new Schema({
    stepname: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    sort: Number,
    steps: [
        {
            step: {
                type: String,
                required: true
            },
            check: {
                type: Boolean,
                default: false
            },
        }
    ]
}, {
    timestamps: true
});


module.exports = Steps = mongoose.model('steps', StepSchema);