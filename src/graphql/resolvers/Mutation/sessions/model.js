var Waterline = require("waterline");
const { name: identity } = require("./about")

export default Waterline.Collection.extend({
  identity,
  datastore: "default",
  primaryKey: "id",

  attributes: {
    id: { type: "string", required: true },
    start_time: { type: "string", required: true },
    end_time: { type: "string" },
    table : { type: "string", required: true },
    isDeleted: { type: "boolean", defaultsTo: false }
  }
});
