const {Schema, model} = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            match:  [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            unique: false
        },
        lists: [
            {
            type: Schema.Types.ObjectId,
            ref: 'List'
            }
        ]
    }
);


//code block taken form profile.js lesson 22 activity 23 server>models>profile.js

//**********************************************

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

//**********************************************

//this function gives the user schema its name!!!
  const UserSchema = model('UserSchema', userSchema);

module.exports = UserSchema;