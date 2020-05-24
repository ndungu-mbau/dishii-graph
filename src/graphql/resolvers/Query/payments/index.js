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
    bill: async (root, args, { db: { collections }}) => {
      const entry = await collections["bill"].findOne({ where: { id: root.bill }})
      return entry
    },
    balance: async (root, args, { db: { collections }}) => {
      const bill = await collections["bill"].findOne({ where: { id: root.bill }})

      const session = await collections["session"].findOne({ where: { id: bill.session }})
      const orders = await collections["order"].find({ where: { session: session.id}})

      const instances = (await Promise.all(orders.map(async ({ id }) => collections["instance"].find({ where: { order: id }})))).flatten()
      const meals = await Promise.all(instances.map(async ({ meal: id }) => await collections["meal"].findOne({ where: { id }})))
      const total = meals.reduce((acc, { price }, i) => acc + price * instances[i].amount, 0)

      return root.amount - total
    },
  }
}

export { list, single, listDeleted, nested };
