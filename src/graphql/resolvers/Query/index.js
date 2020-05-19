import {
  list as tables,
  single as table
} from "./tables"

import {
  list as meals,
  single as meal,
  nested as Nmeal
} from "./meals"

import {
  list as instances,
  single as instance,
  nested as Ninstance
} from "./instances"

const nested = {};

Object.assign(
  nested,

  Nmeal,
  Ninstance
)

const Query = {
  hello:() => "Hello query",

  tables,
  table,

  meals,
  meal,

  instances,
  instance
}

export {
  Query,
  nested
}