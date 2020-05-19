var Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    seats: { type: "number", required: true },
    device : { type: "string", required: true },
    number : { type: "string", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
});
