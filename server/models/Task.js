const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: false,
        unique: false,
        /*
        javascript has a get day function that returns a number 0 - 6 for the day of the week of the current date
        */
    },
    dueDate: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        match: [/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/, 'Must match a day of the week!']
    },
    startTime: {
        type: Date,
        required: false,
        unique: false,
    },
    finishTime: {
        type: Date,
        required: false,
        unique: false,
    },
    completed: {
        type: Boolean,
        default: false,
    }
},
{
   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);

//this function gives the user schema its name!!!
const TaskSchema = model('Task', taskSchema);

module.exports = TaskSchema;