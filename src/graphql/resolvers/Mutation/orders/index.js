import { ObjectId } from "mongodb"
import random from "randomatic"
const { name } = require("./about")

const { UserError } = require("graphql-errors");

const create = async (data, { db: { collections }}) => {
  const id = new ObjectId().toHexString();
  const number = random('0', 8)
  const entry = Object.assign(data[name], { id, isDeleted: false, number })

  try {
    await collections[name].create(entry)

    return entry;
  } catch (err) {
    throw new UserError(err.details);
  }
};

const update = async (data, { db: { collections } }) => {
  const { id } = data[name];
  const entry = Object.assign({}, data[name], data[name].meals && { meals: data[name].meals.join(",") });

  try {
    delete entry.id;

    await collections[name].update({ id }).set(entry);

    return {
      id
    };
  } catch (err) {
    throw new UserError(err.details);
  }
};

const archive = async (data, { db: { collections } }) => {
  const { id } = data[name];

  try {
    await collections[name].update({ id }).set({ isDeleted: true });

    return {
      id
    };
  } catch (err) {
    throw new UserError(err.details);
  }
};

const restore = async (data, { db: { collections } }) => {
  const { id } = data[name];

  try {
    await collections[name].update({ id }).set({ isDeleted: false });

    return {
      id
    };
  } catch (err) {
    throw new UserError(err.details);
  }
};

export default () => {
  return {
    create,
    update,
    archive,
    restore
  };
};
