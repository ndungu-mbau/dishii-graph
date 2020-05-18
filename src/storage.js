import Waterline from "waterline"
import DiskAdapter from "sails-disk"
import MongoAdapter from "sails-mongo"

const { NODE_ENV, DB_URL } = process.env

var waterline = new Waterline()

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