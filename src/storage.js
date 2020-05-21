import Waterline from "waterline"
import DiskAdapter from "sails-disk"
import MongoAdapter from "sails-mongo"

import table from "./graphql/resolvers/Mutation/tables/model"
import meal from "./graphql/resolvers/Mutation/meals/model"
import instance from "./graphql/resolvers/Mutation/instances/model"
import order from "./graphql/resolvers/Mutation/orders/model"
import session from "./graphql/resolvers/Mutation/sessions/model"
import bill from "./graphql/resolvers/Mutation/bills/model"

const { NODE_ENV, DB_URL } = process.env

var waterline = new Waterline()

waterline.registerModel(table)
waterline.registerModel(meal)
waterline.registerModel(instance)
waterline.registerModel(order)
waterline.registerModel(session)
waterline.registerModel(bill)

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