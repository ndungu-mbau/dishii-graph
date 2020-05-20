const { name } = require("./about")

const list = async (root, args, { db: { collections } }) => {
  const entries = await collections[name].find({
    where: {
      isDeleted: false
    }
  });
  return entries;
};

const listDeleted = async (root, args, { db: { collections } }) => {
  const entries = await collections[name].find({
    where: {
      isDeleted: true
    }
  });
  return entries;
};

const single = async (root, args, { db: { collections } }) => {
  const { id } = args[name];

  const entry = await collections[name].findOne({
    where: { id, isDeleted: false }
  });
  return entry;
};

const nested = {
  [name]: {
    meals: async (root, args, { db: { collections }}) => {
      const entries = await collections["instance"].find({ where: { order: root.id }})
      return entries
    },
    total: async (root, args, { db: { collections }}) => {
      const instances = await collections["instance"].find({ where: { order: root.id }})
      const meals = await Promise.all(instances.map(async ({ meal: id }) => await collections["meal"].findOne({ where: { id }})))
      const total = meals.reduce((acc, { price }, i) => acc + price * instances[i].amount, 0)
      return total
    }
  }
}

export { list, single, listDeleted, nested };
