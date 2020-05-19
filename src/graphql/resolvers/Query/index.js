import {
  list as tables,
  single as table
} from "./tables"

import {
  list as meals,
  single as meal,
  nested as Nmeal
} from "./meals"

const nested = {};

Object.assign(
  nested,

  Nmeal
)

const Query = {
  hello:() => "Hello query",

  tables,
  table,

  meals,
  meal
}

export {
  Query,
  nested
}