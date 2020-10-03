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
    items: async (root, args, { db: { collections }}) => {
      return root.items.split(",")
    },
    menu: async (root, args, { db: { collections }}) => {
      const entry = await collections["menu"].findOne({ where: { id: root.menu }})
      return entry
    },
  }
}

export { list, single, listDeleted, nested };
