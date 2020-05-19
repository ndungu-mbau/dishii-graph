import Waterline from "waterline"
import DiskAdapter from "sails-disk"
import MongoAdapter from "sails-mongo"

import table from "./graphql/resolvers/Mutation/tables/model"
import meal from "./graphql/resolvers/Mutation/meals/model"

const { NODE_ENV, DB_URL } = process.env

var waterline = new Waterline()

waterline.registerModel(table)
waterline.registerModel(meal)

var config = {
  adapters: {
    mongo: MongoAdapter,
    disk: DiskAdapter,
  },
  datastores: {
    default: !['development', "test"].includes(NODE_ENV) ? {
      adapter: 'mongo',
      url: DB_URL
    } : {
      adapter: "disk",
      // filePath: '/tmp'
    }
  }
};

export default new Promise((resolve, reject) => {
  waterline.initialize(config, (err, db) => {
    if (err) {
      console.log(err)
      reject(err)
    }
    resolve(db)
  })
})