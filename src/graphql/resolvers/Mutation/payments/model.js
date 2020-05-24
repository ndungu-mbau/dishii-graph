var Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    bill: { type: "string", required: true },
    method: { type: "string", required: true },
    amount: { type: "number", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
});
