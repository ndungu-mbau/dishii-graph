import {
  list as tables,
  single as table
} from "./tables"

const nested = {};

const Query = {
  hello:() => "Hello query",

  tables,
  table
}

export {
  Query,
  nested
}