const db = require('../config/connection');
const { User, List, Task } = require('../models');
const userSeeds = require('./userSeeds.json');
const listSeeds = require('./listSeeds.json');
const taskSeeds = require('./taskSeeds.json');

db.once('open', async () => {
    try {
      await List.deleteMany({});
      await User.deleteMany({});
      await Task.deleteMany({})
  
      await User.create(userSeeds);
  
      for (let i = 0; i < listSeeds.length; i++) {
        const { _id, email } = await List.create(listSeeds[i]);
        const user = await User.findOneAndUpdate(
          { email: email },
          {
            $addToSet: {
              list: _id,
            },
          }
        );
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
  });
  