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
  

      await Task.create(taskSeeds);
      await List.create(listSeeds);

      await User.create(userSeeds);
  
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
  });
  