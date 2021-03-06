var Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    menu: { type: "string", required: true },
    items : { type: "string", required: true },
    img : { type: "string", required: true },
    price : { type: "number", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
});
