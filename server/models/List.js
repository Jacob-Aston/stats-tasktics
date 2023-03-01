const {Schema, model} = require('mongoose');

const listSchema = new Schema(
    {
        //this is the day of the week that tasks will go from complete to incomplete and new tasks will be created
        taskRefreshDay: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            match:  [/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/, 'Must match a day of the week!']
        },

        task: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Task'
            }
        ]
    }
);



//this function gives the user schema its name!!!
  const ListSchema = model('List', listSchema);

module.exports = ListSchema;