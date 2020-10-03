var Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    session: { type:"string", required: true },
    status: { type:"string", required: true },
    number: { type: "number", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }

  }
});
