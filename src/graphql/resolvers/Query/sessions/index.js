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
    table: async (root, args, { db: { collections }}) => {
      const entry = await collections["table"].findOne({ where: { id: root.table }})
      return entry
    },
    orders: async (root, args, { db: { collections }}) => {
      const entries = await collections["order"].find({ where: { session: root.id }})
      return entries
    },
    bill: async (root, args, { db: { collections }}) => {
      const entry = await collections["bill"].findOne({ where: { session: root.id }})
      return entry
    }
  }
}

export { list, single, listDeleted, nested };
