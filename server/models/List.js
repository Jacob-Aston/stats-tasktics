const {Schema, model} = require('mongoose');

const listSchema = new Schema(
    {
        listTitle: {
            type: String,
            required: true,
            unique: false
        },
        //this is the day of the week that tasks will go from complete to incomplete and new tasks will be created
        taskRefreshDay: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            match:  [/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/, 'Must match a day of the week!']
        },

        tasks: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Task'
            }
        ]
    } ,
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);



//this function gives the user schema its name!!!
  const ListSchema = model('List', listSchema);

module.exports = ListSchema;