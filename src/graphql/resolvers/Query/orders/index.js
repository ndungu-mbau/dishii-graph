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
      const ids = root.meals.split(",")
      const entries = Promise.all(ids.map(async id => await collections["instances"].findOne({ where: { id }})))
      return entries
    }
  }
}

export { list, single, listDeleted, nested };
