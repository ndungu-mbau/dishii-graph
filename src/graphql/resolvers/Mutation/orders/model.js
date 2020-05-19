var Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    meals: { type: "string", required: true },
    total : { type: "number", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }

  }
});
