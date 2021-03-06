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
    meal: async (root, args, { db: { collections }}) => {
      const entry =  await collections["meal"].findOne({ where: { id: root.meal }})
      return entry
    },
    order: async (root, args, { db: { collections }}) => {
      const entry =  await collections["order"].findOne({ where: { id: root.order }})
      return entry
    }
  }
}

export { list, single, listDeleted, nested };
