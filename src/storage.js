import Waterline from "waterline"
import DiskAdapter from "sails-disk"
import MongoAdapter from "sails-mongo"

import table from "./graphql/resolvers/Mutation/tables/model"
import menu from "./graphql/resolvers/Mutation/menus/model"
import meal from "./graphql/resolvers/Mutation/meals/model"
import instance from "./graphql/resolvers/Mutation/instances/model"
import order from "./graphql/resolvers/Mutation/orders/model"
import session from "./graphql/resolvers/Mutation/sessions/model"
import bill from "./graphql/resolvers/Mutation/bills/model"
import payment from "./graphql/resolvers/Mutation/payments/model"

const { NODE_ENV, DB_URL } = process.env

var waterline = new Waterline()

waterline.registerModel(table)
waterline.registerModel(menu)
waterline.registerModel(meal)
waterline.registerModel(instance)
waterline.registerModel(order)
waterline.registerModel(session)
waterline.registerModel(bill)
waterline.registerModel(payment)

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